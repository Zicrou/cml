json.current @demographics.current_page
json.per_page @demographics.limit_value
json.pages @demographics.total_pages
json.count @demographics.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @demographics do |demographic|
    json.partial! 'api/v1/demographics/demographic', demographic: demographic
  end
end
