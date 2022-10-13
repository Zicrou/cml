FactoryBot.define do
  factory :answer do
    answer_type { 'string' }
    response { Faker::Quote.famous_last_words }
    sort_id { 1 }
    association :user
    association :question
  end
end
