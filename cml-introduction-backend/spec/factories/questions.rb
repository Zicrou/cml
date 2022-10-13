FactoryBot.define do
  factory :question do
    title { Faker::Name.name }
    sort_id { 1 }
    is_public { false }
    association :question_category
  end
end
