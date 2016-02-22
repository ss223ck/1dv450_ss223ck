module Api
  module V1
    class EventsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token

      def index
        respond_with Event.order('events.created_at DESC').all
      end

      def show
        respond_with Event.find(params[:id])
      end

      def create
        @event = Event.new(get_event_post_variables)

        #@event << Tag.find(params[:tag_id])

        if @event.save
          respond_with status: 201
        else
          respond_with status: 500
        end
      end

      def update
        @event = Event.find(get_event_post_variables[:id])
        @event << Tag.find(params[:tag_id])

        if @event.save
          respond_with status: 200
        else
          respond_with status: 500
        end
      end

      def destroy
        @event = Events.find(params[:id])
        if @event.destroy && Event.find(:id).Create_events_tags_table.destroy
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

      def get_event_post_variables
        params.require(:event).permit(:position_id, :creator_id, :description)
      end
    end
  end
end
