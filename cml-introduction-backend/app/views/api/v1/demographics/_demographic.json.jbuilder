json.sys do
  json.id demographic.id
  json.type demographic.class.name
  json.created_at demographic.created_at
  json.updated_at demographic.updated_at
end

if current_user.admin || demographic.user_id == current_user.id
  json.extract! demographic, :person_name, :ethnic_background,
                :denomination, :address, :telephone, :highest_education,
                :citizenship_status, :occupation, :previously_married, :divorced
else
  json.extract! demographic, :person_name, :ethnic_background,
                :denomination, :highest_education,
                :citizenship_status, :occupation, :previously_married, :divorced
end
json.looking_for demographic.user.looking_for
json.date_of_birth(demographic.date_of_birth)

json.demographic_image do
  if demographic.demographic_image.attachment.present?
    json.orignal url_for(demographic.demographic_image.attachment)
    json.thumb url_for(demographic.demographic_image.attachment)
  else
    json.orignal :nil
    json.thumb :nil
  end
end
