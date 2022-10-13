class User < ApplicationRecord
  has_one :demographic, dependent: :destroy
  has_one :invitation, dependent: :destroy
  has_many :answers, dependent: :destroy
  has_many :event_memberships, dependent: :destroy
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  scoped_search relation: :demographic, on: :person_name, aliases: [:name]
  scoped_search relation: :demographic, on: :previously_married
  scoped_search on: :looking_for
end
