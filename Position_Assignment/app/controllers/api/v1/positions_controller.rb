module Api
  module V1
    class PositionsController < ApplicationController
      respond_to :json
      before_filter :restrict_access, only: [:create, :update, :destroy]
      before_filter :get_offset_and_limit
      skip_before_filter  :verify_authenticity_token

      def index
        @position = Position.all

        @position = @position.page(1).per(@limit).padding(@offset)
        @next_offset = @offset + @limit
        @next_url = request.base_url + '/api/v1/tags?limit=' + @limit.to_s + '&offset=' + @next_offset.to_s

        @response = {next_url: @next_url,
                     requested_position: @position}
        render json: @response, status: 200
      end

      def show
        if Position.exists?(params[:id])
          render json: Position.find(params[:id])
        else
          render json: '{"Error":"Could not find the specific location"}', status: :not_foundt
        end
      end

      def create
        if get_position_post_variables[:location_name].present? &&
            get_position_post_variables[:longitude].present? &&
            get_position_post_variables[:latitude].present?
          @position = Position.new(get_position_post_variables)

          if @position.save
            render json: @position, status: :created
          else
            render json: @position.errors, status: :unprocessable_entity
          end
        else
          render json: '{"Error":"You need to post location_name, longitude and latitude "}', status: :unprocessable_entity
        end
      end

      def update
        if get_position_post_variables[:location_name].present? &&
            get_position_post_variables[:longitude].present? &&
            get_position_post_variables[:latitude].present? &&

          if Position.exists?(params[:id])
            @position = Position.find(params[:id])

            if @position.update_attributes(get_position_post_variables)
              render json: @position, status: 200
            else
              render json: @position.errors, status: 422
            end
          else
            render json: '{"Error":"The position does not exist"}', status: :unprocessable_entity
          end
        else
          render json: '{"Error":"You need to post location_name, longitude and latitude "}', status: :unprocessable_entity
        end
      end

      def destroy
        if Position.exists?(params[:id])
          @position = Position.find(params[:id])
          if @position.destroy
            render json: '{"Message":"Position was deleted"}', status: :ok
          else
            render json: @position.errors, status: :unprocessable_entity
          end
        else
          render json: '{"Error":"The specific position does not exist"}'
        end

      end

      private

      def get_position_post_variables
        params.require(:position).permit(:location_name,:longitude, :latitude)
      end
    end
  end
end
