FactoryBot.define do
  factory :interest_preference do
    interested_in factory: :event_membership
    interested_by factory: :event_membership
  end
end
