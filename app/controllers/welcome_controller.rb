class WelcomeController < ApplicationController
  def index
    contacts = {
      instagram: {
        address: 'https://www.instagram.com/photo_by_annabaryshnikova/',
        login: 'photo_by_annabaryshnikova'
      },
      phone: { address: '8-982-787-34-67' },
      email: { address: 'photobaryshnikova@mail.ru' }
    }
    render component: 'pages/welcome/Welcome', props: {
      albums: Album.limit(3).order(:priority),
      contacts: contacts,
      main_text: Text.find_by(key: 'Main about')
    }
  end
end
