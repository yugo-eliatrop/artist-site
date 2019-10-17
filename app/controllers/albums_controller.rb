class AlbumsController < ApplicationController
  def change_priority
    params[:priority].each_with_index do |id, i|
      Album.find(id).update priority: i
    end
    head :ok
  end
end
