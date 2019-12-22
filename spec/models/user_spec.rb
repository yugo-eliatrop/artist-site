require 'rails_helper'

RSpec.describe User, type: :model do
  context 'validation tests' do
    it 'ensures name is present' do
      user = User.new(email: 'ph@ph.com', password: '123123')
      expect(user.valid?).to eq(false)
      user.name = 'qwerty'
      expect(user.valid?).to eq(true)
    end

    it 'ensures name length is correct' do
      user = User.new(name: ' ', email: 'ph@ph.com', password: '123123')
      expect(user.valid?).to eq(false)
      user.name = 'a'
      expect(user.valid?).to eq(true)
      user.name = '1234567890' * 5
      expect(user.valid?).to eq(true)
      user.name += '1'
      expect(user.valid?).to eq(false)
    end

    it 'ensures email unique' do
      u = User.create(name: 'test', email: 'ph@ph.com', password: '123123')
      user = User.new(name: 'test', email: 'ph@ph.com', password: '123123')
      expect(user.valid?).to eq(false)
      user.email += '1'
      expect(user.valid?).to eq(true)
      u.destroy
    end

    it 'ensures email valid' do
      user = User.new(name: 'test', email: 'ph@', password: '123123')
      expect(user.valid?).to eq(false)
      user.email += '1'
      expect(user.valid?).to eq(true)
    end
  end
end
