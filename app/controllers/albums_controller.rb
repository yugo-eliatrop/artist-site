class AlbumsController < ApplicationController
  include AdminSettings
  before_action :authenticate_user!, except: %i[index show]
  before_action :set_album, only: %i[show update destroy]

  def index
    render component: 'pages/album/Albums', props: {
      albums: Album.visible.order(:priority),
      contacts: Contact.of_all(%w[instagram phone email]),
      logo: Logo.load,
      user: current_user
    }
  end

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
      logo: Logo.load,
      album: Album.find(params[:id])
    }
  end

  def show
    render component: 'pages/album/Album', props: {
      album: @album,
      albums: Album.visible.order(:priority),
      contacts: Contact.of_all(%w[instagram phone email]),
      logo: Logo.load,
      user: current_user
    }
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
    Album.slider&.update slider: false
  end

  def set_album
    @album = Album.find(params[:id])
  end

  def album_params
    params.permit(:id, :name, :description, :visible, :slider)
  end
end
