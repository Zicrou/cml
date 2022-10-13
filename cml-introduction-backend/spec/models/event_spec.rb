require 'rails_helper'

RSpec.describe Event, type: :model do
  it { is_expected.to validate_presence_of(:title) }
  it { is_expected.to validate_presence_of(:date_time) }
  it { is_expected.to validate_presence_of(:event_code) }
  it { is_expected.to validate_presence_of(:address_location) }
  it { is_expected.to validate_presence_of(:fees) }

  it { is_expected.to validate_presence_of(:event_type) }

  it {
    validate_inclusion_of(:event_type)
      .in_array(%w[paid free])
  }

  describe '.expired' do
    subject { described_class.expired }

    let(:expired_event) { create(:event, date_time: (1.day + 1.minute).ago) }
    let(:active_event) { create(:event, date_time: Time.zone.now) }

    before do
      expired_event.save
      active_event.save
    end

    it { is_expected.to include(expired_event) }
    it { is_expected.not_to include(active_event) }
  end

  describe '.active' do
    subject { described_class.active }

    let(:expired_event) { create(:event, date_time: (1.day + 1.minute).ago) }
    let(:active_event) { create(:event, date_time: Time.zone.now + 1.second) }

    before do
      expired_event.save
      active_event.save
    end

    it { is_expected.not_to include(expired_event) }
    it { is_expected.to include(active_event) }
  end
end
