class CongratulationMailer < ApplicationMailer
  def congratulation_email(current_user)
    mail(to: current_user.email, subject: 'Congratulations')
  end
end
