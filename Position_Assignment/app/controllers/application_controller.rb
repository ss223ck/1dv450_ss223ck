class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= User.find(session[:userid]) if session[:userid]
  end

  def check_valid_authentication
    if current_user.nil? then
      flash[:error] = "Du måste vara inloggad"
      redirect_to users_path
    end
  end
  def check_if_admin_authentication
    current_user.is_admin == 1
  end
end
