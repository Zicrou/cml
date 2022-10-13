Rails.application.routes.draw do
  devise_for :admin_users, ActiveAdmin::Devise.config
  ActiveAdmin.routes(self)
  scope module: :api, defaults: { format: :json } do
    namespace :v1 do
      post :backs, to: 'answers#back'
      resources :me
      resources :events do
        get 'invitations/me', to: 'invitations#check_invitation_status'
        get 'invitations/delete', to: 'invitations#delete_membership'
        get :generate_pdf, to: 'generate_pdf#show'
        get :invite_more_user, to: 'invitations#invite_more_user'
        resource :match_notification
        resources :invitations
        resources :member_matches
        resources :invitation_updates
        resources :event_members
        resources :interest_preferences
        get :verify_order, to: 'orders#verify_order'
      end
      resources :users do
        resources :answers, only: %i[index update show]
        resource :demographic
      end
      resources :question_categories, only: %i[index show] do
        resources :questions, only: %i[index show] do
          resources :answers, only: %i[create]
        end
      end
    end
  end
  mount LetterOpenerWeb::Engine, at: '/letter_opener' if Rails.env.development?
end
