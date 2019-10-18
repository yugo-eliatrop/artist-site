class Image < ApplicationRecord
  has_one :album, class_name: 'album', foreign_key: 'album_id'

  mount_uploader :file, ImageUploader
end
