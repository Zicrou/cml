class Api::V1::InvitationUpdatesController < ApiController
  before_action :set_event, only: %i[create]
  before_action :check_user_role, only: %i[create]

  def create
    event_member_emails = @event.event_memberships.joins(:user).pluck(:email)
    event_member_emails.each do |email|
      InvitationUpdatesMailer.with(event: @event, date_time: date_time_headers)
                             .invitation_update_email(email).deliver_now
    end
    render json: 'Email send to Event Members', status: :ok
  end

  private

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def check_user_role
    return if current_user.admin?

    render json: 'User is not allowed', status: :unprocessable_entity
  end

  def date_time_headers
    request.headers['date-time']
  end
end
