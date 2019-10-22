class AlbumsController < ApplicationController
  before_action :authenticate_user!, only: %i[create edit change_priority]
  before_action :set_album, only: %i[update destroy]

  def create
    album = Album.new album_params
    if album.save
      render json: { id: album.id }, status: :ok
    else
      render json: album.errors, status: :unprocessable_entity
    end
  end

  def edit
    render component: 'pages/admin/album/Form', props: {
      csrf_token: form_authenticity_token,
      album: Album.find(params[:id])
    }, prerender: false
  end

  def update
    reset_slider if album_params[:slider]
    if @album.update album_params
      head :ok
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @album.destroy
    head :ok
  end

  def change_priority
    params[:priority].each_with_index do |id, i|
      Album.find(id).update priority: i
    end
    head :ok
  end

  private

  def reset_slider
    Album.slider.update slider: false
  end

  def set_album
    @album = Album.find(params[:id])
  end

  def album_params
    params.permit(:id, :name, :description, :visible, :slider)
  end
end
