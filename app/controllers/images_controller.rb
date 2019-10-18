class ImagesController < ApplicationController
  before_action :authenticate_user!

  def create
    image = Image.new image_params
    if image.save
      head :ok
    else
      render json: { errors: image.errors }, status: :unprocessable_entity
    end
  end

  private

  def image_params
    params.permit(:album_id, :file)
  end
end
