module Api
  module V1
    class EventsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token

      def index

        if params[:search]
          @event = Event.where("description like ?", "%#{params[:search]}%")
          render json: @event, status: :ok
        else
          @event = Event.order('events.updated_at DESC').all

          if (params[:offset] && params[:limit])
            @event = @event.page(1).per(params[:limit]).padding(params[:offset])
          else
            @event = @event.page(1).per(25)
          end
          @response = '{ "nextPage":"' + request.base_url + '/api/v1/events?limit='+
              params[:limit] +'&offset='+ (params[:offset].to_i + params[:limit].to_i) + '" }'
          render json: @response, status: 200
        end

      end

      def show
        if Event.exists?(params[:id])
          render json: Event.find(params[:id]), status: :ok
        else
          render json: '{"Error":"Could not find the specific event"}'
        end
      end

      def show_nearby_events
        if params[:location_name].prensent?
          render json: Position.near(params[:location_name], 10).events, status: :ok
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
        if params[:position_id].+ && params[:creator_id].present? && params[:description].present?
          params.require(:event).permit(:position_id, :creator_id, :description)
        else
          render json: '{"error": "You need to send correct parameters"}', status: 403
        end
      end

    end
  end
end
