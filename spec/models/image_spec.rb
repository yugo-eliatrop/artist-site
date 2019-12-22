require 'rails_helper'

RSpec.describe Image, type: :model do
  context 'validation tests' do
    it 'ensures album is present' do
      album = Album.create! name: 'name'
      img = Image.new(album_id: album.id)
      expect(img.valid?).to eq(true)
      album.destroy
    end
  end

  context 'priority tests' do
    it 'ensures correct priority' do
      album = Album.create(name: 'test')
      img1 = Image.create album_id: album.id
      img2 = Image.create album_id: album.id
      img3 = Image.create album_id: album.id
      expect(img1.priority).to eq(0)
      expect(img2.priority).to eq(1)
      expect(img3.priority).to eq(2)
      img2.destroy
      img4 = Image.create album_id: album.id
      expect(img4.priority).to eq(3)
      img4.destroy
      img5 = Image.create album_id: album.id
      expect(img5.priority).to eq(3)
      album.destroy
    end
  end
end
