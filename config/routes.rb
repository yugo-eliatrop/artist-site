Rails.application.routes.draw do
  root to: 'welcome#index'
  
  resources :albums, on: :collection
end
