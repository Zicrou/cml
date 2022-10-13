json.sys do
  json.id invitation.id
  json.type invitation.class.name
  json.created_at invitation.created_at
  json.updated_at invitation.updated_at.to_time.to_i
end

json.extract! invitation, :email, :invitation_code, :status
json.looking_for invitation.user.looking_for
json.user_id invitation.user.id
json.event_memberships invitation.user.event_memberships.count
invitations = Invitation.where(user_id: invitation.user.id)
json.event_invitations invitations.count

if invitation.user.demographic.present?
  json.person_name invitation.user.demographic.person_name
  json.date_of_birth invitation.user.demographic.date_of_birth
  json.previously_married invitation.user.demographic.previously_married
else
  json.person_name nil
  json.date_of_birth nil
  json.previously_married nil
end
