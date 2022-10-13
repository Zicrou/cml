json.current @member_matches.current_page
json.per_page @member_matches.limit_value
json.pages @member_matches.total_pages
json.count @member_matches.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @member_matches do |member_match|
    json.partial! 'api/v1/member_matches/member_match', member_match: member_match
  end
end
