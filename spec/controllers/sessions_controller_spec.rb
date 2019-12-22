require 'rails_helper'

RSpec.describe SessionsController, type: :controller do
  describe 'GET #new' do
    it 'returns http success if unauthtorized' do
      get :new
      expect(response).to have_http_status(:success)
    end

    it 'returns http redirect if authtorized' do
      u = User.create(name: 'n', email: 'ph@ph.com', password: '123123')
      post :create, params: { user: { email: 'ph@ph.com', password: '123123' } }
      get :new
      expect(response).to have_http_status(:redirect)
      u.destroy
    end
  end

  describe 'POST #create' do
    it 'returns http success' do
      u = User.create(name: 'n', email: 'ph@ph.com', password: '123123')
      post :create, params: { user: { email: 'ph@ph.com', password: '123123' } }
      expect(response).to have_http_status(:success)
      u.destroy
    end
  end
end
