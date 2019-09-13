require 'rails_helper'

RSpec.describe Text, type: :model do
  context 'validation tests' do
    it 'ensures key and title are present' do
      text = Text.new
      expect(text.valid?).to eq(false)
      text.key = 'Key'
      expect(text.valid?).to eq(false)
      text.key = nil
      text.title = 'Title'
      expect(text.valid?).to eq(false)
      text.key = 'Key'
      expect(text.valid?).to eq(true)
    end

    it 'ensures keys length is correct' do
      text = Text.new(key: '', title: '12345')
      expect(text.valid?).to eq(false)
      text.key = '1'
      expect(text.valid?).to eq(false)
      text.key = '12'
      expect(text.valid?).to eq(false)
      text.key = '123'
      expect(text.valid?).to eq(true)
      text.key = '1234567890'
      expect(text.valid?).to eq(true)
      text.key = '12345678901'
      expect(text.valid?).to eq(false)
    end

    it 'ensures title length is correct' do
      text = Text.new(key: '123', title: '')
      expect(text.valid?).to eq(false)
      text.title = '1'
      expect(text.valid?).to eq(false)
      text.title = '12'
      expect(text.valid?).to eq(false)
      text.title = '123'
      expect(text.valid?).to eq(true)
    end

    it 'ensures key unique' do
      Text.create(key: 'key1', title: 'key1')
      text = Text.new(key: 'key1', title: 'key1')
      expect(text.valid?).to eq(false)
      text.key = 'key2'
      expect(text.valid?).to eq(true)
    end
  end
end
