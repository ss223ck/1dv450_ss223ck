Rails.application.routes.draw do
  namespace :api, defaults: {format: "json"} do
    namespace :v1 do
      get "events/nearby/" => "events#show_nearby_events"
      resources :events
      resources :positions
      get "tags/specific/" => "tags#show_specific_event"
      resources :tags
    end
  end
  root "users#index"

  resources :users
  resources :creators

  post "login" => "users#login", as: :login
  get "logout" => "users#logout", as: :logout

  get "/creators/:id" => "creators#destroy", as: :destroy_creator



end
