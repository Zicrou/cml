class MatchNotificationMailer < ApplicationMailer
  def match_notification_email(email, subject, body)
    @body = body
    matched_demographic = params[:matched_demographic].first

    email_attachments(matched_demographic)
    mail(to: email, subject: subject)
  end

  def email_attachments(matched_demographic)
    if matched_demographic.present?
      @person_name = matched_demographic.person_name
      @age = ((Date.today - matched_demographic.date_of_birth).to_i / 365.25).ceil
      matched_demographic_image(matched_demographic.demographic_image)
      @previously_married = matched_demographic.previously_married == 'no' ? 'single' : 'married'
    else
      return_nil_values
    end
  end

  def matched_demographic_image(demographic_image)
    @demographic_image = demographic_image.attachment.present? ? url_for(demographic_image) : nil
  end

  def return_nil_values
    @person_name = nil
    @age = nil
    @demographic_image = nil
    @previously_married = nil
  end
end
