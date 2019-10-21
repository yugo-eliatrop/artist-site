class Image < ApplicationRecord
  validates :album_id, presence: true

  has_one :album, class_name: 'album', foreign_key: 'album_id'

  after_validation :define_priority

  mount_uploader :file, ImageUploader

  private

  def define_priority
    return if priority.present?

    images = Album.find(album_id).images.order(:priority)
    self.priority =
      if images.size.zero?
        0
      else
        images.pluck(:priority).max + 1
      end
  end
end
