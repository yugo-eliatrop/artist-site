class AlbumsController < ApplicationController
  before_action :authenticate_user!, only: %i[new change_priority]

  def new
    render component: 'pages/admin/album/New', props: {
      csrf_token: form_authenticity_token
    }
  end

  def change_priority
    params[:priority].each_with_index do |id, i|
      Album.find(id).update priority: i
    end
    head :ok
  end
end
