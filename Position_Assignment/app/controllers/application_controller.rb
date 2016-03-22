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
    current_user.is_admin
  end

  def get_offset_and_limit
    @offset = 0
    @limit = 25
    if params[:offset]
      @offset = params[:offset].to_i
    end
    if params[:limit]
      @limit = params[:limit].to_i
    end
  end

  def restrict_access
    authenticate_or_request_with_http_token do |token, options|
      Creator.exists?(applikation_api: token)
    end
  end
end