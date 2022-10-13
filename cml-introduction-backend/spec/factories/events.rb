FactoryBot.define do
  factory :event do
    title { Faker::Name.name }
    date_time { Faker::Time.forward(days: 14, period: :evening) }
    event_code { Faker::Alphanumeric.unique.alphanumeric(number: 4) }
    address_location { Faker::Address.latitude }
    fees { Faker::Number.number(digits: 2) }
    event_type { 'paid' }
  end
end
