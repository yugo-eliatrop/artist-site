class WelcomeController < ApplicationController
  def index
    contacts = {
      instagram: {
        link: 'https://www.instagram.com/photo_by_annabaryshnikova/',
        title: 'photo_by_annabaryshnikova'
      },
      phone: { link: '8-982-787-34-67' },
      email: { link: 'photobaryshnikova@mail.ru' }
    }
    render component: 'pages/welcome/Welcome', props: {
      albums: Album.limit(3).order(:priority),
      contacts: contacts
    }
  end
end
