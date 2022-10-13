class EventMembership < ApplicationRecord
  belongs_to :user
  belongs_to :event
  belongs_to :order
  has_many :interest_preferences, foreign_key: :interested_by_id, dependent: :destroy
  has_many :member_matches, foreign_key: :interested_member_one_id, dependent: :destroy
end
