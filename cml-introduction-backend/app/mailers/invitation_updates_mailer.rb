class InvitationUpdatesMailer < ApplicationMailer
  def invitation_update_email(email)
    @event = params[:event]
    @invitation = params[:invitation]
    @date_time = params[:date_time]

    mail(to: email, subject: 'CML event Invitation Update')
  end
end
