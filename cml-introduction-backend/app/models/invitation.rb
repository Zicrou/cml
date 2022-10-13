class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :event
  attr_accessor :subject, :body, :event_date_time
end
