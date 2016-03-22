module Api
  module V1
    class EventsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token
      before_filter :get_offset_and_limit

      def index
        if params[:search]
          @event = Event.where("description like ?", "%#{params[:search]}%")
          render json: @event, status: :ok
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

      def show
        if Event.exists?(params[:id])
          render json: Event.find(params[:id]), status: :ok
        else
          render json: '{"Error":"Could not find the specific event"}'
        end
      end

      def show_nearby_events
        if params[:location_name].present?
          @nearby_events = []
          @nearby_positions = Position.near(params[:location_name], 100000000000000)
          @nearby_positions.each do |position|
            @nearby_events.push(Event.find_by(position.id))
          end
          render json: @nearby_events, status: :ok
        else
          render json: '{ "error": "You must send a location name" }', status: :unprocessable_entity
        end
      end

      def create
        if Event.find(params[:id]).creator == Creator.find_by(applikation_api: get_api_key[:application_api_key])
          @event = Event.new(get_event_post_variables)

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
          render json: '{"Error":"You are not owner of this resource"}', status: :unauthorized
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
        if Event.find(params[:id]).creator == Creator.find_by(applikation_api: get_api_key[:application_api_key])
          @event = Events.find(params[:id])
          if @event.destroy && Event.find(:id).Create_events_tags_table.destroy
            render json: '{"Message":"You removed the specific event"}', status: :ok
          else
            render json: '{"Error":"Could not remove specific event"}', status: :unprocessable_entity
          end
        else
          render json: '{"Error":"You are not the owner of this resource"}', status: :unauthorized
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
