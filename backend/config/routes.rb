Rails.application.routes.draw do
  get "uploads/create"
  get "/current_user", to: "current_user#index"
  devise_for :users, path: "", path_names: {
    sign_in: "login",
    sign_out: "logout",
    registration: "signup"
  },
  controllers: {
    sessions: "users/sessions",
    registrations: "users/registrations"
  }
  # Custom route for verifying JWT token
  devise_scope :user do
    get "users/verify_token", to: "users/sessions#verify_token"
  end

  resources :posts # Your post routes
  # Active Storage direct upload routes
  post "/rails/active_storage/direct_uploads", to: "active_storage/direct_uploads#create"


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"
end
