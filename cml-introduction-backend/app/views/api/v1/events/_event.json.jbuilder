json.sys do
  json.id event.id
  json.type event.class.name
  json.created_at event.created_at
  json.updated_at event.updated_at
end

date_time_now = DateTime.now
event_memberships = event.event_memberships.where(user_id: current_user.id)
if current_user.admin?
  json.extract! event, :title, :event_code, :address_location, :fees, :event_type
  json.date_time event.date_time.to_time.to_i
  json.visible_until event.date_time.to_time.to_i + 1.day
elsif current_user.admin == false && event_memberships.present? && event.date_time + 1.day >= DateTime.now
  json.extract! event, :title, :event_code, :address_location, :fees, :event_type
  json.date_time event.date_time.to_time.to_i
  json.visible_until event.date_time.to_time.to_i + 1.day
  json.event 'active'
elsif current_user.admin == false && event_memberships.present? && date_time_now > event.date_time
  json.event 'expired'
elsif date_time_now > event.date_time
  json.event 'expired'
else
  json.extract! event, :event_type, :fees
end
