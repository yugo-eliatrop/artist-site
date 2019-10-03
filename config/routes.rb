Rails.application.routes.draw do
  root to: 'welcome#index'
  
  resources :albums, on: :collection

  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'
  get '/signout' => 'sessions#destroy'
end
