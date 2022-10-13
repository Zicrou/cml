FactoryBot.define do
  factory :invitation do
    email { Faker::Internet.email }
    status { 'no' }
    invitation_code { Faker::Alphanumeric.unique.alphanumeric(number: 4) }
    association :user
    association :event
  end
end
