class QuestionCategory < ApplicationRecord
  has_many :questions, dependent: :destroy
  validates :title, presence: true
  validates :sort_id, presence: true
end
