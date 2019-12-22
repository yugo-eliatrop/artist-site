require 'rails_helper'

RSpec.describe ImagesController, type: :controller do
  describe 'POST #create' do
    it 'returns http redirect if unauthtorized' do
      post :create, params: { name: 'name' }
      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'POST #change_priority' do
    it 'returns http redirect if unauthtorized' do
      post :change_priority
      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'POST #destroy_several' do
    it 'returns http redirect if unauthtorized' do
      post :destroy_several
      expect(response).to have_http_status(:redirect)
    end
  end
end
