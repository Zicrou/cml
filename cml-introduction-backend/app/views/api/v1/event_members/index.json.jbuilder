json.current @event_members.current_page
json.per_page @event_members.limit_value
json.pages @event_members.total_pages
json.count @event_members.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @event_members do |event_member|
    json.partial! 'api/v1/event_members/event_member', event_member: event_member
  end
end
