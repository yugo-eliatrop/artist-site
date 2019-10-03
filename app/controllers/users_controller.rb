class UsersController < ApplicationController
  def new
    render component: 'pages/login/Form', props: {
      user_exists: false,
      csrf_token: form_authenticity_token
    }
  end

  def create
    user = User.new user_params
    if user.save
      session[:user_id] = user.id
      head :ok
    else
      render json: { errors: user.errors }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password,
                                 :password_confirmation)
  end
end
