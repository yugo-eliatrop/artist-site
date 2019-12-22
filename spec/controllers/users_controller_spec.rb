require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe 'GET #new' do
    it 'returns http success if unauthtorized' do
      get :new
      expect(response).to have_http_status(:success)
    end
  end

  # it 'returns http redirect if authtorized' do
  #   get :new
  #   expect(response).to have_http_status(:redirect)
  # end

  describe 'POST #create' do
    it 'returns http success' do
      post :create, params: { user: { email: 'p@ph.com',
                                      name: 'n',
                                      password: '123123',
                                      password_confirmation: '123123' } }
      expect(response).to have_http_status(:success)
      User.find_by(email: 'p@ph.com').destroy
    end
  end
end
