class Event < ApplicationRecord
  has_many :invitations, dependent: :destroy
  has_one_attached :pdf_file
  has_many :event_memberships, dependent: :destroy
  validates :title, presence: true
  validates :date_time, presence: true
  validates :event_code, presence: true
  validates :address_location, presence: true
  validates :fees, presence: true
  scoped_search on: %i[event_code], default_operator: :eq
  validates :event_type, presence: true,
                         inclusion: { in: %w[paid free] }

  scope :expired, -> { where("(date_time + INTERVAL '1 day') < ?", Time.zone.now) }
  scope :active, -> { where("(date_time + INTERVAL '1 day') >= ?", Time.zone.now) }
end
