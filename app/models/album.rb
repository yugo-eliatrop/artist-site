class Album < ApplicationRecord
  validates :name, presence: true, uniqueness: true,
                   length: { minimum: 3, maximum: 30 }

  before_create :initialize_priority

  has_many :images, dependent: :destroy

  scope :visible, -> { where visible: true }

  def as_json(*)
    super(except: %i[created_at updated_at]).tap do |hash|
      hash['images'] = images.order(:priority)
    end
  end

  def update_priority(next_alb = nil)
    return if eql?(next_alb)

    if next_alb.nil?
      update priority: set_priority
    else
      return if next_alb.priority - priority == 1

      list = [self]
      index = next_alb.priority
      list += Album.where("priority >= #{next_alb.priority} AND id != #{id}")
                   .map do |album|
        album
      end
      list.each_with_index do |e, i|
        e.update! priority: index + i
      end
    end
  end

  def self.slider
    Album.find_by(slider: true).images.map { |img| img.file.url }
  end

  private

  def initialize_priority
    self.priority = set_priority
  end

  def set_priority
    last = Album.all.max_by(&:priority)
    if last.nil?
      0
    else
      last.priority + 1
    end
  end
end
