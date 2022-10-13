json.sys do
  json.id interest_preference.id
  json.type interest_preference.class.name
  json.created_at interest_preference.created_at
  json.updated_at interest_preference.updated_at
end

json.interested_in_id interest_preference.interested_in.id
json.interested_by_id interest_preference.interested_by.id
