class Answer < ApplicationRecord
  belongs_to :question
  belongs_to :user
  validates :answer_type, presence: true
  validates :answer_type, inclusion: { in: %w[boolean string] }
  validates :sort_id, presence: true
end
