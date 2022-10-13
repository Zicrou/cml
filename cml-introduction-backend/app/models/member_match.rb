class MemberMatch < ApplicationRecord
  belongs_to :interested_member_one, class_name: 'EventMembership'
  belongs_to :interested_member_two, class_name: 'EventMembership'
end
