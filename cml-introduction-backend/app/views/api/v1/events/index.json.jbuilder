json.current @events.current_page
json.per_page @events.limit_value
json.pages @events.total_pages
json.count @events.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @events do |event|
    json.partial! 'api/v1/events/event', event: event
  end
end
