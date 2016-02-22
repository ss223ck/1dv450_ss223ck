Rails.application.routes.draw do
  namespace :api, defaults: {format: "json"} do
    namespace :v1 do
      resources :events
      resources :positions
      resources :tags
      get "tag/specific" => "tags#show_specific_event"
    end
  end
  root "users#index"

  resources :users
  resources :creators

  post "login" => "users#login", as: :login
  get "logout" => "users#logout", as: :logout

  get "/creators/:id" => "creators#destroy", as: :destroy_creator



end
