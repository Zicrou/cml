json.sys do
  json.id member_match.id
  json.type member_match.class.name
  json.created_at member_match.created_at
  json.updated_at member_match.updated_at
end

json.interested_member_one member_match.interested_member_one.id
json.interested_member_two member_match.interested_member_two.id
