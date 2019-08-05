class Text < ApplicationRecord
  validates :title, :key, presence: true
  validates :key, length: { minimum: 3, maximum: 10 },
                  uniqueness: true
  validates :title, length: { minimum: 3 }
end
