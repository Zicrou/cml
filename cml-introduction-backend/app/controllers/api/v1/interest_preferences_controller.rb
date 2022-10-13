class Api::V1::InterestPreferencesController < ApiController
  before_action :set_event
  before_action :set_event_membership
  before_action :validate_interested_in_belongs_to_event, only: :create
  before_action :set_interest_preference, only: %i[destroy]
  def index
    case current_user.admin
    when false
      @interest_preferences = interest_preferences_for_user
    when true
      @interest_preferences = interest_preferences_for_admin
    end
  end

  def create
    @interest_preference = @event_membership.interest_preferences.new(interest_preference_params)
    if @interest_preference.save
      render :show, status: :created
      create_match
    else
      render json: @interest_preference.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @interest_preference.destroy
  end

  private

  def interest_preference_params
    params.require(:interest_preference).permit(:interested_in_id)
  end

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def set_event_membership
    @event_membership = @event.event_memberships.where(user_id: current_user.id).first
  end

  def set_interest_preference
    @interest_preference = @event_membership.interest_preferences.where(id: params[:id]).first
  end

  def validate_interested_in_belongs_to_event
    return if @event.event_memberships.where(id: interest_preference_params[:interested_in_id]).exists?

    render json: 'Interested in is not a member of an event', status: :unprocessable_entity
  end

  def interest_preferences_for_admin
    event_memberships_ids = @event.event_memberships.all.ids
    InterestPreference.where(interested_by: event_memberships_ids).order(created_at: :desc).page(params[:page])
  end

  def interest_preferences_for_user
    @event_membership.interest_preferences.order(created_at: :desc).page(params[:page])
  end

  def create_match
    interested_in_id = interest_preference_params[:interested_in_id]
    if interest_preferences_for_admin.where('interested_by_id IN (?) AND interested_in_id IN (?)',
                                            interested_in_id, @event_membership.id).exists?

      @event_membership.member_matches.create(interested_member_two_id: interested_in_id.to_i)
    end
  end
end
