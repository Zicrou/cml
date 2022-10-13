require 'rails_helper'

RSpec.describe Demographic, type: :model do
  it { is_expected.to belong_to(:user) }
  it { is_expected.to validate_presence_of(:person_name) }
  it { is_expected.to validate_presence_of(:date_of_birth) }
  it { is_expected.to validate_presence_of(:ethnic_background) }
  it { is_expected.to validate_presence_of(:denomination) }
  it { is_expected.to validate_presence_of(:citizenship_status) }
  it { is_expected.to validate_presence_of(:highest_education) }
  it { is_expected.to validate_presence_of(:previously_married) }
  it { is_expected.to validate_presence_of(:divorced) }
  it { is_expected.to validate_presence_of(:occupation) }

  it {
    validate_inclusion_of(:ethnic_background)
      .in_array(%w[pakistani indian egyptian])
  }

  it {
    validate_inclusion_of(:denomination)
      .in_array(%w[sunni shia])
  }

  it {
    validate_inclusion_of(:citizenship_status)
      .in_array(%w[us_citizen permanent_resident])
  }

  it {
    validate_inclusion_of(:highest_education)
      .in_array(%w[high_school some_college
                   vocational_degree undergraduate_degree
                   graduate_degree post_graduate_degree])
  }

  it {
    validate_inclusion_of(:previously_married)
      .in_array(%w[no once twice more_then_twice])
  }

  it {
    validate_inclusion_of(:divorced)
      .in_array(%w[yes no])
  }

  it {
    validate_content_type_of(:demographic_image)
      .in_array('image/png', 'image/jpg', 'image/jpeg')
  }
end
