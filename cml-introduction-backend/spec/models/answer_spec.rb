require 'rails_helper'

RSpec.describe Answer, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to belong_to(:question) }
  it { is_expected.to validate_presence_of(:answer_type) }
  it { is_expected.to validate_inclusion_of(:answer_type).in_array(%w[boolean string]) }
  it { is_expected.to validate_presence_of(:sort_id) }
end
