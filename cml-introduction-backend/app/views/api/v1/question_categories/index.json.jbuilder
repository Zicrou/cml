json.current @question_categories.current_page
json.per_page @question_categories.limit_value
json.pages @question_categories.total_pages
json.count @question_categories.total_count
json.sys do
  json.type 'Array'
end

json.items do
  json.array! @question_categories do |question_category|
    json.partial! 'api/v1/question_categories/question_category', question_category: question_category
  end
end
