FactoryBot.define do
  factory :demographic do
    person_name { Faker::Name.unique.name }
    date_of_birth { Faker::Date.birthday(min_age: 18, max_age: 65) }
    ethnic_background { 'pakistani' }
    denomination { 'sunni' }
    address { Faker::Address.street_address }
    telephone { Faker::PhoneNumber.cell_phone_in_e164 }
    demographic_image { Faker::Avatar.image }
    association :user
  end
end
