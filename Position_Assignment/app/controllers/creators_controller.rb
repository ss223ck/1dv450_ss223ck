class CreatorsController < ApplicationController
  before_action :check_valid_autentication

  def index
    @user = User.find(session[:userid])
    puts @user
    if (@user.is_admin == 1)
      @creator = Creator.all
    else
      @creator = Creator.where(user_id: session[:userid])
    end
  end
  def new
    @creator = Creator.new
  end

  def create
    @creator = Creator.new(get_creator_post_variables)
    @creator.user_id = session[:userid]

    #Hittade denna koden på nätet
    o = [('a'..'z'), ('A'..'Z')].map { |i| i.to_a }.flatten
    randomString = (0...50).map { o[rand(o.length)] }.join

    @creator.applikation_api = randomString

    if @creator.save
      flash[:success] = "Du har nu en ny api-nyckel"
      redirect_to creators_path
    else
      flash[:error] = "Något har gått fel"
      render "new"
    end
  end

  def destroy
    redirect_to creators_path
  end

  private

  def get_creator_post_variables
    params.require(:creator).permit(:applikation_name, :applikation_decription)
  end


end
