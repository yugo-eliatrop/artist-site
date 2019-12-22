require 'rails_helper'

RSpec.describe Contact, type: :model do
  context 'validation tests' do
    it 'ensures email checking if service is email' do
      contact = Contact.new(service: 'phone', address: '123345')
      expect(contact.valid?).to eq(true)
      contact.service = 'email'
      expect(contact.valid?).to eq(false)
      contact.address = 'ph@ph.com'
      expect(contact.valid?).to eq(true)
    end
  end

  context 'get contacts test' do
    phone_v = '8-555-345-12-34'
    instagram_v = 'instagram.com'
    email_v = 'ph@ph.com'
    it 'return value of service' do
      c1 = Contact.create(service: 'phone', address: phone_v)
      c2 = Contact.create(service: 'instagram', login: '@photo',
                          address: instagram_v)
      c3 = Contact.create(service: 'email', address: email_v)
      phone = Contact.of(:phone)[:phone][:address]
      expect(phone).to eq(phone_v)
      phone = Contact.of_all([:phone])[:phone][:address]
      expect(phone).to eq(phone_v)
      instagram = Contact.of(:instagram)[:instagram][:address]
      expect(instagram).to eq(instagram_v)
      instagram = Contact.of_all(%i[instagram phone])[:instagram][:address]
      expect(instagram).to eq(instagram_v)
      email = Contact.of(:email)[:email][:address]
      expect(email).to eq(email_v)
      email = Contact.of_all(%i[instagram phone email])[:email][:address]
      expect(email).to eq(email_v)
      c1.destroy
      c2.destroy
      c3.destroy
    end
  end
end
