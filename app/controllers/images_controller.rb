class ImagesController < ApplicationController
  before_action :authenticate_user!

  def create
    errors = []
    image_params[:files].each do |file|
      image = Image.new(album_id: image_params[:album_id], file: file)
      errors << image.errors unless image.save
    end
    if errors.blank?
      render json: {
        album: Album.find(image_params[:album_id])
      }, status: :ok
    else
      render json: {
        errors: errors,
        album: Album.find(image_params[:album_id])
      }, status: :unprocessable_entity
    end
  end

  def change_priority
    params[:priority].each_with_index do |id, i|
      Image.find(id).update priority: i
    end
    head :ok
  end

  def destroy_several
    image_params[:ids].each do |id|
      Image.find(id).destroy
    end
    head :ok
  end

  private

  def image_params
    params.permit(:album_id, files: [], ids: [])
  end
end
