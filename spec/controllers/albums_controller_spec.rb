require 'rails_helper'

RSpec.describe AlbumsController, type: :controller do
  describe 'GET #index' do
    it 'returns http success' do
      get :index
      expect(response).to have_http_status(:success)
    end
  end

  describe 'GET #show' do
    it 'returns http success' do
      a = Album.create(name: 'name')
      get :show, params: { id: a.id }
      expect(response).to have_http_status(:success)
      a.destroy
    end
  end

  describe 'POST #create' do
    it 'returns http redirect if unauthtorized' do
      post :create, params: { name: 'name' }
      expect(response).to have_http_status(:redirect)
    end

    # it 'returns http success if authtorized' do
    #   post :create, params: { name: 'name' }
    #   expect(response).to have_http_status(:success)
    # end
  end

  describe 'GET #edit' do
    it 'returns http redirect if unauthtorized' do
      get :edit, params: { id: 1 }
      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'PUT #update' do
    it 'returns http redirect if unauthtorized' do
      put :update, params: { id: 1 }
      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'DELETE #destroy' do
    it 'returns http redirect if unauthtorized' do
      delete :destroy, params: { id: 1 }
      expect(response).to have_http_status(:redirect)
    end
  end

  describe 'POST #change_priority' do
    it 'returns http redirect if unauthtorized' do
      post :change_priority
      expect(response).to have_http_status(:redirect)
    end
  end
end
