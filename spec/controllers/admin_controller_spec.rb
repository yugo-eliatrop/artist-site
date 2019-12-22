require 'rails_helper'

RSpec.describe AdminController, type: :controller do
  describe 'GET #index' do
    it 'returns http redirect if unauthtorized' do
      get :index
      expect(response).to have_http_status(:redirect)
    end

    # it 'returns http success if authtorized' do
    #   u = User.create(name: 'n', email: 'ph@ph.com', password: '123123')
    #   post :create, params: {
    #     user: { email: 'ph@ph.com', password: '123123' }
    #   }
    #   get :index
    #   expect(response).to have_http_status(:success)
    #   u.destroy
    # end
  end
end
