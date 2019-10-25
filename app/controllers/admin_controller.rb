class AdminController < ApplicationController
  include AdminSettings
  before_action :authenticate_user!

  def index
    render component: 'pages/admin/Main', props: {
      albums: Album.all.order(:priority),
      texts: Text.all.order(:id),
      contacts: Contact.all.order(:id),
      signup_is_open: SignUp.open?,
      csrf_token: form_authenticity_token
    }
  end

  def update
    case params[:type]
    when 'text'
      update_text
    when 'contact'
      update_contact
    else
      head 404
    end
  end

  def toggle_signup
    if params[:open].eql?('true')
      SignUp.open
    else
      SignUp.close
    end
    render json: SignUp.open?
  end

  private

  def update_text
    text = Text.find(params[:id])
    if text.update text_params
      head :ok
    else
      render json: {
        type: 'text',
        id: text.id,
        errors: text.errors
      }, status: :unprocessable_entity
    end
  end

  def update_contact
    contact = Contact.find(params[:id])
    if contact.update contact_params
      head :ok
    else
      render json: {
        type: 'contact',
        id: contact.id,
        errors: contact.errors
      }, status: :unprocessable_entity
    end
  end

  def text_params
    params.permit(:title, :content)
  end

  def contact_params
    params.permit(:login, :address)
  end
end
