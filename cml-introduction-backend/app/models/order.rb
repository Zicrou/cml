class Order < ApplicationRecord
  has_one :event_membership, dependent: :destroy
end
