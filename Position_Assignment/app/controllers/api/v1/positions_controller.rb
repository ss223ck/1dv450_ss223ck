module Api
  module V1
    class PositionsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      before_filter :get_offset_and_limit
      skip_before_filter  :verify_authenticity_token

      def index

        @position = Position.all

        @position = @position.page(1).per(@limit).padding(@offset)
        @next_offset = @offset + @limit
        @next_url = request.base_url + '/api/v1/tags?limit=' + params[:limit] + '&offset=' + @next_offset.to_s

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

      def get_position_post_variables
        if params[:name].present? && params[:longitude].present? && params[:latitude].present?
          params.require(:tag).permit(:name,:longitude, :latitude)
        else
          render json: '{"Error":"You need to post the right parameters"}', status: :unprocessable_entity
        end
      end

    end
  end
end
