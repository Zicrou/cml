FactoryBot.define do
  factory :order do
    status { 'COMPLETED' }
    amount { 9.99 }
    order_id { '85D78306E2558100Y' }
  end
end
