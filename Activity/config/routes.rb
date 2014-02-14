Form::Application.routes.draw do
  resources :users, only: [:create]

  root 'users#login', :as=>"login"
  get "/welcome" =>"users#welcome", :as => "welcome"
  get "/register" => "users#register", :as =>"register"
  get "/forget_password"=>"users#forget_password",:as=>"forget_password"
  get"/reset_password_of_question_and_answer"=>"users#reset_password_of_question_and_answer", :as=>"reset_password_of_question_and_answer"
  get "/set_new_password"=>"users#set_new_password", :as=>"set_new_password"
  delete "/logout"=>"users#logout", :as=>"logout"
  post"/create_login_session" => "users#create_login_session"
  post"/reset_password_by_name"=>"users#reset_password_by_name"
  post"/check_question_and_answer"=>"users#check_question_and_answer"
  post"/reset_password_after_answer"=>"users#reset_password_after_answer"





  get "administrators/administrator_index"=>"administrators#administrator_index", :as=>"administrator_index"
  get "administrators/add_user"=>"administrators#add_user",:as=>"add_user"
  get "administrators/modify_user_information"=>"administrators#modify_user_information",:as=>"modify_user_information"

  post "administrators/add_user"=>"administrators#create_user"
  delete "delete_user"=>"administrators#delete_user",:as=>"delete_user"
  post "administrators/update_user_password"=>"administrators#update_user_password"



  post"/users/authenticate_user"=>"users#authenticate_user"

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
