json.sys do
  json.id invite_more_user.id
  json.type invite_more_user.class.name
  json.created_at invite_more_user.created_at
  json.updated_at invite_more_user.updated_at
end

invite_more_user_demographic = invite_more_user.demographic
json.email invite_more_user.email
json.looking_for invite_more_user.looking_for
json.attended_events invite_more_user.event_memberships.count
if invite_more_user_demographic.present?
  json.person_name invite_more_user_demographic.person_name
  json.date_of_birth invite_more_user_demographic.date_of_birth
  json.previously_married invite_more_user_demographic.previously_married
  demographic_image = invite_more_user_demographic.demographic_image
  json.demographic_image do
    if demographic_image.attachment.present?
      json.orignal url_for(demographic_image)
      json.thumb url_for(demographic_image)
    else
      json.orignal :nil
      json.thumb :nil
    end
  end
else
  json.person_name nil
  json.date_of_birth nil
  json.previously_married nil
  json.demographic_image nil
end
