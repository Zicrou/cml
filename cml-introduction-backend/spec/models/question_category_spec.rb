require 'rails_helper'

RSpec.describe QuestionCategory, type: :model do
  it { is_expected.to have_many(:questions).dependent(:destroy) }
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:sort_id) }
end
