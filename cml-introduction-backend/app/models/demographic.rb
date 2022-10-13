class Demographic < ApplicationRecord
  include ActiveStorageSupport::SupportForBase64
  has_one_base64_attached :demographic_image
  belongs_to :user
  validates :demographic_image, content_type: ['image/png',
                                               'image/jpg',
                                               'image/jpeg'],
                                size: { less_than: 10.megabytes,
                                        message: 'is not greater than 10 MB' }
  validates :person_name, presence: true
  validates :occupation, presence: true
  validates :date_of_birth, presence: true
  validates :ethnic_background, presence: true,
                                inclusion: { in: %w[black white arab indo-Pak other] }
  validates :denomination, presence: true,
                           inclusion: { in: %w[sunni shia] }
  validates :citizenship_status, presence: true,
                                 inclusion: {
                                   in: %w[us-citizen permanent-resident]
                                 }
  validates :highest_education, presence: true,
                                inclusion: {
                                  in: %w[high-school some-college
                                         vocational-degree undergraduate-degree
                                         graduate-degree post-graduate-degree]
                                }
  validates :previously_married, presence: true,
                                 inclusion: {
                                   in: %w[no once widowed divorced]
                                 }
  validates :divorced, presence: true,
                       inclusion: {
                         in: %w[yes no]
                       }
end
