require 'rails_helper'

RSpec.describe InterestPreference, type: :model do
  subject { create(:interest_preference) }

  it { is_expected.to belong_to(:interested_in).class_name('EventMembership') }
  it { is_expected.to belong_to(:interested_by).class_name('EventMembership') }
  it { is_expected.to validate_uniqueness_of(:interested_in).scoped_to(:interested_by_id) }
end
