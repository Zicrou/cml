class Api::V1::MatchNotificationsController < ApiController
  before_action :set_event, only: %i[create]
  before_action :find_notified_membership, only: %i[create]
  before_action :matched_demographic, only: %i[create]

  def create
    send_match_notification_email
    render json: 'Notification Sent', status: :ok
  end

  private

  def match_notification_params
    params.require(:match_notification).permit(:notified_membership_id, :email_subject,
                                               :email_message, :matched_membership_id)
  end

  def send_match_notification_email
    subject = match_notification_params[:email_subject]
    message = match_notification_params[:email_message]
    MatchNotificationMailer.with(matched_demographic: matched_demographic)
                           .match_notification_email(@email, subject, message).deliver_now
  end

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def find_notified_membership
    notified_membership_id = match_notification_params[:notified_membership_id]
    notified_event_membership = @event.event_memberships.joins(:user).where(id: notified_membership_id)
    if notified_event_membership.exists?
      @email = notified_event_membership.pluck(:email)
    else
      render json: 'Notified Member not found in this event', status: :not_found
    end
  end

  def matched_demographic
    matched_membership_id = match_notification_params[:matched_membership_id]
    matched_membership = @event.event_memberships.joins(:user).where(id: matched_membership_id)
    if matched_membership.exists?
      Demographic.where(user_id: matched_membership.pluck(:user_id))
    else
      render json: 'Matched Member not found in this event', status: :not_found
    end
  end
end
