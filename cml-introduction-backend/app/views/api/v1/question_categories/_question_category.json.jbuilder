json.sys do
  json.id question_category.id
  json.type question_category.class.name
  json.created_at question_category.created_at
  json.updated_at question_category.updated_at
end

json.extract! question_category, :title, :sort_id
