FactoryBot.define do
  factory :question_category do
    title { Faker::Name.name }
    sort_id { 1 }
  end
end
