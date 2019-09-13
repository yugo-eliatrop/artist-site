class WelcomeController < ApplicationController
  def index
    render component: 'pages/welcome/Welcome', props: {
      albums: Album.all.order(:priority)
    }
  end
end
