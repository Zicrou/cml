FactoryBot.define do
  factory :event_membership do
    paid { true }
    association :user
    association :event
    association :order
  end
end
