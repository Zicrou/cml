class Question < ApplicationRecord
  belongs_to :question_category
  has_many :answers, dependent: :destroy
  validates :title, presence: true
  validates :sort_id, presence: true
  validates :is_public, inclusion: { in: [true, false] }
end
