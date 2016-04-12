module Api
  module V1
    class EventsController < ApplicationController
      respond_to :json
      before_filter :restrict_access, only: [:create, :update, :destroy]
      skip_before_filter  :verify_authenticity_token
      before_filter :get_offset_and_limit

      def index
        if params[:search]
          @event = Event.where("description like ?", "%#{params[:search]}%")
          render json: {requested_events: @event}, status: :ok
        else
          @event = Event.order('events.updated_at DESC').all

          @event = @event.page(1).per(@limit).padding(@offset)
          @next_offset = @offset + @limit
          @next_url = request.base_url + '/api/v1/events?limit=' + @limit.to_s + '&offset=' + @next_offset.to_s

          @response = {next_url: @next_url,
                        requested_events: @event}
          render json: @response, status: 200
        end
      end
      def authenticate_creator
        creator = Creator.find_by_applikation_name(params[:applikation_name])
        if creator && creator.authenticate(params[:password])
          render json: {application_api: creator.applikation_api}, status: :ok
        else
          render json: {error: "Could not authenticate"}
        end
      end
      def show
        if Event.exists?(params[:id])
          render json: Event.find(params[:id]), status: :ok
        else
          render json: '{"Error":"Could not find the specific event"}'
        end
      end
      def show_events_for_creator
        if get_api_key[:application_api_key].present?
          @this_creator = Creator.find_by(applikation_api: get_api_key[:application_api_key])
          @events = @this_creator.Events
          render json: { requested_events: @events}, status: :ok
        else
          render json: '{"Error":"You have to send application key"}'
        end
      end
      def show_nearby_events
        if params[:location_name].present?
          @nearby_events = []
          @nearby_positions = Position.near(params[:location_name], 20)
          @nearby_positions.each do |position|
            if Event.find_by_position_id(position.id).present?
              @nearby_events.push(Event.find_by_position_id(position.id))
            end

          end
          render json: @nearby_events, status: :ok
        else
          render json: '{ "error": "You must send a location name" }', status: :unprocessable_entity
        end
      end

      def create
        if get_api_key[:application_api_key].present? || get_event_post_variables[:creator_id].present?
          @event = Event.new(get_event_post_variables)
          @this_creator = Creator.find_by(applikation_api: get_api_key[:application_api_key])
          @event.creator_id = @this_creator.id
          if get_body_post_variables[:tags].present?
            get_body_post_variables[:tags].each do |tag|
              if Tag.exists?(tag)
                @event.tags << Tag.find_by(tag)
              else
                @event.tags << Tag.create(tag)
              end
            end
          end

          if get_body_post_variables[:position].present?
            if Position.exists?(get_body_post_variables[:position])
              @event.position = Position.find_by(get_body_post_variables[:position])
            else
              @event.position = Position.create(get_body_post_variables[:position])
            end
          end

          if @event.save
            render json: @event, status: :created
          else
            render json: @event.errors, status: :unprocessable_entity
          end
        else
          render json: '{"Error":"You need to send application key or creator id in request"}', status: :unprocessable_entity
        end


      end

      def update
        if Event.find(params[:id]).creator == Creator.find_by(applikation_api: get_api_key[:application_api_key])
          @event = Event.find(params[:id])

          if get_body_post_variables[:tags].present?
            get_body_post_variables[:tags].each do |tag|
              if Tag.exists?(tag)
                @event.tags << Tag.find_by(tag)
              else
                @event.tags << Tag.create(tag)
              end
            end
          end

          if get_body_post_variables[:position].present?
            if Position.exists?(get_body_post_variables[:position])
              @event.position = Position.find_by(get_body_post_variables[:position])
            else
              @event.position = Position.create(get_body_post_variables[:position])
            end
          end

          if @event.update_attributes(get_event_post_variables.except(:creator_id, :position_id))
            render json: @event, status: :ok
          else
            render json: @event.errors, status: 422
          end
        else
          render json: '{"Error":"You are not owner of this resource"}', status: :unauthorized
        end
      end

      def destroy
        if Event.exists?(params[:id])
          if Event.find(params[:id]).creator == Creator.find_by(applikation_api: get_api_key[:application_api_key])
            @event = Event.find(params[:id])

            if @event.destroy
              render json: '{"Message":"You removed the specific event"}', status: :ok
            else
              render json: '{"Error":"Could not remove specific event"}', status: :unprocessable_entity
            end
          else
            render json: '{"Error":"You are not the owner of this resource"}', status: :unauthorized
          end
        else
          render json: '{"Error":"The event does not exist"}', status: :unauthorized
        end
      end

    private

      def get_event_post_variables
        params.require(:event).permit(:position_id, :creator_id, :description)
      end

      def get_body_post_variables
        params.permit(position:[:location_name, :longitude, :latitude], tags:[:name])
      end

      def get_api_key
        params.permit(:application_api_key)
      end
    end
  end
end
