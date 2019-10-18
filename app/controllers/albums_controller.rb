class AlbumsController < ApplicationController
  before_action :authenticate_user!, only: %i[edit change_priority]

  def edit
    render component: 'pages/admin/album/Form', props: {
      csrf_token: form_authenticity_token,
      album: Album.find(params[:id])
    }
  end

  def change_priority
    params[:priority].each_with_index do |id, i|
      Album.find(id).update priority: i
    end
    head :ok
  end
end
