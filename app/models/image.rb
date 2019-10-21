class Image < ApplicationRecord
  validates :album_id, presence: true

  has_one :album, class_name: 'album', foreign_key: 'album_id'

  after_validation :define_priority

  mount_uploader :file, ImageUploader

  private

  def define_priority
    return if priority.present?

    self.priority = Album.find(album_id).images
                         .order(:priority).last.priority + 1
  end
end
