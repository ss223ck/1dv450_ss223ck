Rails.application.routes.draw do
  namespace :api, defaults: {format: "json"} do
    namespace :v1 do
      post "events/autenticate_creator/" => "events#authenticate_creator"
      get "events/nearby/" => "events#show_nearby_events"
      post "events/creator_events/" => "events#show_events_for_creator"
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
