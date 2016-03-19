module Api
  module V1
    class PositionsController < ApplicationController
      respond_to :json
      before_filter :restrict_access

      def index
        render json: Position.all, status: :ok
      end

      def show

        if Position.exists?(params[:id])
          render json: Position.find(params[:id])
        else
          render json: '{"Error":"Could not find the specific location"}', status: :not_foundt
        end
      end

      def create
        @position = Position.new(get_position_post_variables)

        if @position.save
          render json: @position, status: :created
        else
          render json: @position.errors, status: :unprocessable_entity
        end
      end

      def update
        @position = Position.find(params[:id])

        if @position.save
          head :no_content
        else
          render json: @position.errors, status: 422
        end
      end

      def destroy
        if Position.exists?(params[:id])
          @position = Position.find(params[:id])
          if @position.destroy && Position.find(:id).Create_events_tags_table.destroy
            render json: '{"Message":"Position was deleted"}', status: :ok
          else
            render json: @position.errors, status: :unprocessable_entity
          end
        else
          render json: '{"Error":"The specific position does not exist"}'
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
        if params[:name].present? && params[:longitude].present? && params[:latitude].present?
          params.require(:tag).permit(:name,:longitude, :latitude)
        else
          head status:400
        end

      end

    end
  end
end
