json.sys do
  json.id answer.id
  json.type answer.class.name
  json.created_at answer.created_at
  json.updated_at answer.updated_at
end

json.extract! answer, :answer_type, :response, :sort_id
json.question_id answer.question_id
json.question_category_id answer.question.question_category_id
json.record_name answer.record_name
