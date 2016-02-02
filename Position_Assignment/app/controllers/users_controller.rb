class UsersController < ApplicationController

  def index
    @user = User.new
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(get_user_post_variables)
    @user.is_admin = 0

    if @user.save
      session[:userid] = @user.id
      redirect_to "/users/"
    else
      render :action => "new"
    end

  end

  def login

  end

  def logout
    
  end

  private

  def get_user_post_variables
    params.require(:user).permit(:user_name, :password, :password_confirmation, :email)
  end
end
