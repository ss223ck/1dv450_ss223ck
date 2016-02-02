class UsersController < ApplicationController

  def index

  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(get_user_post_variables)
    @user.is_admin = 0

    if @user.save
      session[:userid] = @user.id
      redirect_to users_path
    else
      render :action => "new"
    end

  end

  def login
    user = User.find_by_user_name(params[:user_name])
    if user && user.authenticate(params[:password])
      session[:userid] = user.id;
      redirect_to creators_path
    else
      flash[:error] = "Username or password is wrong"
      redirect_to users_path
    end
  end

  def logout
    if session[:userid]
      session[:userid] = nil
      redirect_to users_path
    else
      redirect_to users_path
    end

  end

  private

  def get_user_post_variables
    params.require(:user).permit(:user_name, :password, :password_confirmation, :email)
  end
end
