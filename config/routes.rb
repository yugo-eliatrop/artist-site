Rails.application.routes.draw do
  root to: 'welcome#index'
  
  resources :albums, except: :new do
    post :change_priority, on: :collection
  end

  resources :images, only: :create do
    post :change_priority, on: :collection
    post :destroy_several, on: :collection
  end
  
  get '/admin' => 'admin#index'
  post '/admin_update' => 'admin#update'
  post '/toggle_signup' => 'admin#toggle_signup'
  post '/change_logo' => 'admin#change_logo'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'
  get '/signout' => 'sessions#destroy'
end
