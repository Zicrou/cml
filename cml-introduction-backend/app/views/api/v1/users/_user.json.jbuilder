json.sys do
  json.id user.id
  json.type user.class.name
  json.created_at user.created_at
  json.updated_at user.updated_at
end

user_demographic = user.demographic
json.email user.email
json.looking_for user.looking_for
json.attended_events user.event_memberships.count
if user_demographic.present?
  json.person_name user_demographic.person_name
  json.date_of_birth user_demographic.date_of_birth
  json.previously_married user_demographic.previously_married
  demographic_image = user_demographic.demographic_image
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
