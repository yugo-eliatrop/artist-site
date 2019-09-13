require 'rails_helper'

RSpec.describe Album, type: :model do
  context 'validation tests' do
    it 'ensures name is present' do
      album = Album.new
      expect(album.valid?).to eq(false)
      album.name = 'qwerty'
      expect(album.valid?).to eq(true)
    end

    it 'ensures name length is correct' do
      album = Album.new(name: '')
      expect(album.valid?).to eq(false)
      album.name = '12'
      expect(album.valid?).to eq(false)
      album.name = '123'
      expect(album.valid?).to eq(true)
      album.name = '123456789012345678901234567890'
      expect(album.valid?).to eq(true)
      album.name += '1'
      expect(album.valid?).to eq(false)
    end

    it 'ensures name unique' do
      Album.create(name: 'test')
      album = Album.new(name: 'test')
      expect(album.valid?).to eq(false)
      album.name += '1'
      expect(album.valid?).to eq(true)
    end
  end

  context 'priority tests' do
    it 'check set_priority func' do
      album = Album.create(name: 'test')
      expect(album.priority).to eq(0)
      album2 = Album.create(name: 'test2')
      expect(album2.priority > album.priority).to eq(true)
      album3 = Album.create(name: 'test3')
      expect(album3.priority > album2.priority).to eq(true)
    end

    it 'check update_priority func' do
      a1 = Album.create(name: 'test1').id
      a2 = Album.create(name: 'test2').id
      a3 = Album.create(name: 'test3').id
      Album.find(a3).update_priority(Album.find(a3))
      expect(Album.find(a1).priority < Album.find(a2).priority &&
             Album.find(a2).priority < Album.find(a3).priority).to eq(true)
      Album.find(a3).update_priority(Album.find(a2))
      expect(Album.find(a1).priority < Album.find(a3).priority &&
             Album.find(a3).priority < Album.find(a2).priority).to eq(true)
      Album.find(a2).update_priority(Album.find(a1))
      expect(Album.find(a2).priority < Album.find(a1).priority &&
             Album.find(a1).priority < Album.find(a3).priority).to eq(true)
      Album.find(a2).update_priority(Album.find(a1))
      expect(Album.find(a2).priority < Album.find(a1).priority &&
             Album.find(a1).priority < Album.find(a3).priority).to eq(true)
      Album.find(a2).update_priority(Album.find(a3))
      expect(Album.find(a1).priority < Album.find(a2).priority &&
             Album.find(a2).priority < Album.find(a3).priority).to eq(true)
      Album.find(a1).update_priority
      expect(Album.find(a2).priority < Album.find(a3).priority &&
             Album.find(a3).priority < Album.find(a1).priority).to eq(true)
      a4 = Album.create(name: 'test4').id
      expect(Album.find(a4).priority > Album.find(a1).priority).to eq(true)
      Album.find(a4).update_priority(Album.find(a3))
      expect(Album.find(a2).priority < Album.find(a4).priority &&
             Album.find(a4).priority < Album.find(a3).priority &&
             Album.find(a3).priority < Album.find(a1).priority).to eq(true)
    end
  end
end
