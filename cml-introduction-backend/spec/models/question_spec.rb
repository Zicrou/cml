require 'rails_helper'

RSpec.describe Question, type: :model do
  it { is_expected.to belong_to(:question_category) }
  it { is_expected.to have_many(:answers).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:sort_id) }
  it { is_expected.to validate_inclusion_of(:is_public).in_array([true, false]) }
end
