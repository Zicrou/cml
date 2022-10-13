require 'rails_helper'

RSpec.describe Order, type: :model do
  it { is_expected.to have_one(:event_membership) }
end
