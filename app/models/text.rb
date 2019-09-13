class Text < ApplicationRecord
  validates :key,
            length: { minimum: 3, maximum: 10 },
            uniqueness: true,
            presence: true
  validates :title,
            length: { minimum: 3, maximum: 80 },
            presence: true
end
