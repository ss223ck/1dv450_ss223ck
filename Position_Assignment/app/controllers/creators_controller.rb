class CreatorsController < ApplicationController
  before_action :check_valid_authentication

  def index
    @user = User.find(session[:userid])
    puts @user
    if check_if_admin_authentication
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
    @creator = Creator.find(params[:id])
    if @creator.destroy
      flash[:success] = "Du tog bort applikationen"
    else
      flash[:error] = "Något gick fel när applikationen skulle tas bort"
    end
    redirect_to creators_path

  end

  private

  def get_creator_post_variables
    params.require(:creator).permit(:applikation_name, :applikation_description)
  end


end
