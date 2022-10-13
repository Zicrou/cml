json.sys do
  json.id question.id
  json.type question.class.name
  json.created_at question.created_at
  json.updated_at question.updated_at
end

json.extract! question, :title, :sort_id, :is_public
