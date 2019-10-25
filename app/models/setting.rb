class Setting < ApplicationRecord
  validates :option, presence: true, uniqueness: true
end
