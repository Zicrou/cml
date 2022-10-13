json.current @answers.current_page
json.per_page @answers.limit_value
json.pages @answers.total_pages
json.count @answers.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @answers do |answer|
    json.partial! 'api/v1/answers/answer', answer: answer
  end
end
