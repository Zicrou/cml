FactoryBot.define do
  factory :member_match do
    interested_member_one factory: :event_membership
    interested_member_two factory: :event_membership
  end
end
