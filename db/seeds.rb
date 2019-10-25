4.times do |i|
  Album.create(name: "Album #{i + 1}", description: "About #{i + 1} album")
end

Text.create title: 'Photographer website',
            content: 'Lorem ipsum dolor sit amet',
            key: 'Main about'

Contact.create service: 'phone',
               address: '8-555-345-12-34'

Contact.create service: 'instagram',
               login: '@photographer',
               address: 'https://instagram.com'

Contact.create service: 'email',
               address: 'example@photo.com'

Setting.create option: 'allow_signup',
               value: true
