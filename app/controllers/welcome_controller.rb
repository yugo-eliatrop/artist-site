class WelcomeController < ApplicationController
  def index
    render component: 'pages/welcome/Welcome', props: {}
  end
end
