module Api
  module V1
    class PositionsController < ApplicationController
      respond_to :json
      before_filter :restrict_access

      def index
        respond_with Position.all
      end

      def show
        respond_with Position.find(params[:id])
      end

      def create
        @position = Position.new(get_position_post_variables)
        #@position << Tag.find(params[:id])

        if @position.save
          respond_with status:200
        else
          respond_with status:500
        end
      end

      def update
        @position = Position.find(get_tag_post_variables[:id])
        #@tag << Event.find(params[:event_id])

        if @position.save
          respond_with status: 200
        else
          respond_with status: 500
        end
      end

      def destroy
        @position = Position.find(params[:id])
        if @position.destroy && Position.find(:id).Create_events_tags_table.destroy
          respond_with status: 200
        else
          respond_with status: 500
        end
      end

      private
      #def restrict_access
      #  api_key = Creator.find_by_applikation_api(params[:access_token])
      #  head :unauthorized unless api_key
      #end
      def restrict_access
        authenticate_or_request_with_http_token do |token, options|
          Creator.exists?(applikation_api: token)
        end
      end

      def get_position_post_variables
        params.require(:tag).permit(:name,:longitude, :latitude)
      end

    end
  end
end
