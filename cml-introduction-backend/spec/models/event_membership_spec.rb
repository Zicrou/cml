require 'rails_helper'

RSpec.describe EventMembership, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:event) }
  it { is_expected.to belong_to(:order) }
  it { is_expected.to have_many(:interest_preferences).dependent(:destroy) }
end
