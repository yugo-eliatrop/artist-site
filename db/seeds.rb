4.times do |i|
  Album.create(name: "Album #{i + 1}", description: "About #{i + 1} album")
end

Text.create title: 'Photographer website',
            content: 'Lorem ipsum dolor sit amet',
            key: 'Main about'
