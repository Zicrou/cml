json.sys do
  json.id event_member.id
  json.type event_member.class.name
  json.created_at event_member.created_at
  json.updated_at event_member.updated_at
end

member_demographic = Demographic.where(user_id: event_member.id).first
json.looking_for event_member.looking_for
json.event_membership_id event_member.event_memberships.where(event_id: @event.id).first.id
json.event_memberships event_member.event_memberships.count
invitations = Invitation.where(user_id: event_member.id)
json.event_invitations invitations.count
if member_demographic.present?
  if current_user.id == event_member.id
    json.member_name "#{member_demographic.person_name} (You)"
  else
    json.member_name member_demographic.person_name
  end
  json.date_of_birth member_demographic.date_of_birth
  json.previously_married member_demographic.previously_married
  demographic_image = member_demographic.demographic_image
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
  json.member_name nil
  json.date_of_birth nil
  json.previously_married nil
  json.demographic_image nil
end
