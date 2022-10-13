class Api::V1::MemberMatchesController < ApiController
  before_action :set_event, only: %i[index]
  before_action :check_user_role, only: %i[index]

  def index
    event_memberships_ids = @event.event_memberships.all.ids
    @member_matches = MemberMatch.where(interested_member_one: event_memberships_ids,
                                        interested_member_two: event_memberships_ids)
                                 .order(created_at: :desc).page(params[:page])
  end

  private

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def check_user_role
    return if current_user.admin?

    render json: 'User is not allowed', status: :unprocessable_entity
  end
end
