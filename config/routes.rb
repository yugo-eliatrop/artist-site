Rails.application.routes.draw do
  root to: 'welcome#index'
  
  resources :albums do
    post :change_priority, on: :collection
  end
  
  get '/admin' => 'admin#index'
  post '/admin_update' => 'admin#update'

  get '/signup' => 'users#new'
  post '/users' => 'users#create'
  get '/signin' => 'sessions#new'
  post '/signin' => 'sessions#create'
  get '/signout' => 'sessions#destroy'
end
