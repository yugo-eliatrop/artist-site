class SessionsController < ApplicationController
  before_action :in_system?, only: %i[new create]

  def new
    render component: 'pages/login/Form', props: {
      user_exists: true,
      csrf_token: form_authenticity_token
    }
  end

  def create
    user = User.find_by(email: params[:user][:email])
    if user&.authenticate(params[:user][:password])
      session[:user_id] = user.id
      head :ok
    else
      render json: { errors: { email: ['Wrong email / password'] } },
             status: :unauthorized
    end
  end

  def destroy
    session[:user_id] = nil
    head :ok
  end
end
