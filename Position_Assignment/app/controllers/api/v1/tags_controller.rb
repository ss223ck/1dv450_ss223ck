module Api
  module V1
    class TagsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token

      def index
        respond_with Tag.all
      end

      def show
        respond_with Tag.find(params[:id])
      end

      def show_specific_event
        respond_with Tag.find(params[:id]).events
      end

      def create
        @tag = Tag.new(get_tag_post_variables)

        if @tag.save
          render json: @tag, status: :created
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      def update
        @tag = Tag.find(get_tag_post_variables[:id])
        #@tag << Event.find(params[:event_id])

        if @tag.save
          head :no_content
        else
          render json: @tag.errors, status: 422
        end
      end

      def destroy
        @tag = Tag.find(params[:id])
        if @tag.destroy && Tag.find(:id).Create_events_tags_table.destroy
          head :no_content
        else
          head status: 500
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

      def get_tag_post_variables
        if params[:name].present?
          params.require(:tag).permit(:name)
        else
          render json: '{"error": "You need to send correct parameters"}', status: 403
        end

      end

    end
  end
end
