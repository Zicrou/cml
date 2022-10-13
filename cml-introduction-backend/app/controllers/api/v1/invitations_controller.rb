class Api::V1::InvitationsController < ApiController
  before_action :set_event, only: %i[create update index invite_more_user check_invitation_status delete_membership]
  before_action :set_invitation, only: %i[update]
  before_action :validate_user_invitation, only: %i[update]
  before_action :check_user_role, only: %i[create index invite_more_user]
  before_action :delete_all_previous_invitations_of_user, only: %i[create]

  def index
    @invitations = @event.invitations.joins(:user).all.order(created_at: :desc).page(params[:page])
  end

  def check_invitation_status
    render json: @event.invitations.where(user_id: current_user.id)
  end

  def delete_membership
    data = @event.event_memberships.where(user_id: current_user.id).ids[0]
    EventMembership.delete(data)
    render json: 'delete membership', status: :no_content
  end

  def invite_more_user
    invitations = @event.invitations
    invitation_user_id = invitations.pluck(:user_id)
    invited_more_user = User.where.not(id: invitation_user_id)
    @invite_more_users = invited_more_user.where(admin: false).page(params[:page])
    search_user
  end

  def search_user
    @invite_more_users = @invite_more_users.search_for(params[:name]).search_for(params[:previously_married])
                                           .search_for(params[:looking_for]).where(admin: false)
  end

  def update
    if @invitation.update(update_invitation_params)
      render :show
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  def create
    @invitation = @event.invitations.new(invitation_params_for_create)
    if @invitation.save
      render :show, status: :created
      InviteMailer.with(event: @event, invitation: @invitation).invite_email(invitation_params).deliver_now
    else
      render json: @invitation.errors, status: :unprocessable_entity
    end
  end

  private

  def invitation_params_for_create
    invitation_params.merge(invitation_code: @event.event_code, user_id: invited_user.id)
  end

  def invited_user
    User.find_by(email: invitation_params[:email])
  end

  def invitation_params
    params.require(:invitation).permit(:email, :subject, :body, :event_date_time)
  end

  def update_invitation_params
    params.require(:invitation).permit(:status)
  end

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def set_invitation
    @invitation = @event.invitations.find_by!(id: params[:id])
  end

  def check_user_role
    return if current_user.admin?

    render json: 'User is not allowed', status: :unprocessable_entity
  end

  def delete_all_previous_invitations_of_user
    previous_invitations = @event.invitations.where(user_id: invited_user.id)
    previous_invitations.delete_all
  end

  def validate_user_invitation
    if @invitation.email == current_user.email
      true
    else
      render json: 'This invitation does not belongs to you!', status: :unprocessable_entity
    end
  end
end
