json.current @interest_preferences.current_page
json.per_page @interest_preferences.limit_value
json.pages @interest_preferences.total_pages
json.count @interest_preferences.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @interest_preferences do |interest_preference|
    json.partial! 'api/v1/interest_preferences/interest_preference', interest_preference: interest_preference
  end
end
