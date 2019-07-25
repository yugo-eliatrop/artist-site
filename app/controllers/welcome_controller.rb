class WelcomeController < ApplicationController
  def index
    render component: 'pages/Welcome', props: {}
  end
end
