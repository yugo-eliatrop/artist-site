class WelcomeController < ApplicationController
  def index
    render component: 'pages/welcome/Welcome', props: {
      albums: Album.all
    }
  end
end
