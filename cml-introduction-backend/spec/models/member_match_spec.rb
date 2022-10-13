require 'rails_helper'

RSpec.describe MemberMatch, type: :model do
  subject { create(:member_match) }

  it { is_expected.to belong_to(:interested_member_one).class_name('EventMembership') }
  it { is_expected.to belong_to(:interested_member_two).class_name('EventMembership') }
end
