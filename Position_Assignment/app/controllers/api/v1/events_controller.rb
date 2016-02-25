module Api
  module V1
    class EventsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token

      def index
        @event = Event.order('events.created_at DESC').all

        if (params[:offset] && params[:limit])
          @event = @event.page(1).per(params[:limit]).padding(params[:offset])
        else
          @event = @event.page(1).per(25)
        end

        render json: @event, status: 200
      end

      def show
        respond_with Event.find(params[:id])
      end

      def show_nearby_events
        if (params[:location_name].prensent?)
          Position.near(params[:location_name], 10).events
        else
          render json: '{ "error": "You must send a location name" }', status:500
        end

      end

      def create

        @event = Event.new(get_event_post_variables)

        @event.tags << Tag.find(params[:tag_id]) if params[:tag_id]

        if @event.save
          render json: @event, status: :created
        else
          render json: @event.errors, status: :unprocessable_entity
        end
      end

      def update
        @event = Event.find(params[:id])
        @event.tags << Tag.find(params[:tag_id])

        if @event.save
          head :no_content
        else
          render json: @event.errors, status: 422
        end
      end

      def destroy
        @event = Events.find(params[:id])
        if @event.destroy && Event.find(:id).Create_events_tags_table.destroy
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

      def get_event_post_variables
        if params[:position_id].present? && params[:creator_id].present? && params[:description].present?
          params.require(:event).permit(:position_id, :creator_id, :description)
        else
          render json: '{"error": "You need to send correct parameters"}', status: 403
        end
      end

    end
  end
end
