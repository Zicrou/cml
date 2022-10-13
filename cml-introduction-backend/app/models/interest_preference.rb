class InterestPreference < ApplicationRecord
  belongs_to :interested_in, class_name: 'EventMembership'
  belongs_to :interested_by, class_name: 'EventMembership'

  validates :interested_in, uniqueness: { scope: :interested_by_id }
end
