class InviteMailer < ApplicationMailer
  def invite_email(invitation_params)
    email = invitation_params[:email]
    @body = invitation_params[:body]
    @event_date_time = invitation_params[:event_date_time]
    @event = params[:event]
    @invitation = params[:invitation]
    mail(to: email, subject: subject(invitation_params))
  end

  private

  def subject(invitation_params)
    if !invitation_params[:subject].nil?
      invitation_params[:subject]
    else
      'CML event Invitation'
    end
  end
end
