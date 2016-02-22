module Api
  module V1
    class TagsController < ApplicationController
      respond_to :json
      before_filter :restrict_access

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

        #@tag << Event.find(params[:event_id])

        if @tag.save
          respond_with status: 201
        else
          respond_with status: 500
        end
      end

      def update
        @tag = Tag.find(get_tag_post_variables[:id])
        #@tag << Event.find(params[:event_id])

        if @tag.save
          respond_with status: 200
        else
          respond_with status: 500
        end
      end

      def destroy
        @tag = Tag.find(params[:id])
        if @tag.destroy && Tag.find(:id).Create_events_tags_table.destroy
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

      def get_tag_post_variables
        params.require(:tag).permit(:name)
      end

    end
  end
end
