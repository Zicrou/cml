json.current @questions.current_page
json.per_page @questions.limit_value
json.pages @questions.total_pages
json.count @questions.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @questions do |question|
    json.partial! 'api/v1/questions/question', question: question
  end
end
