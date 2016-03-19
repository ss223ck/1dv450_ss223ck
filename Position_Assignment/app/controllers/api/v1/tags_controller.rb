module Api
  module V1
    class TagsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token

      def index
        render json: Tag.all, status: :ok
      end

      def show
        if Tag.exists?(params[:id])
          render json: Tag.find(params[:id]), status: :ok
        else
          render json: '{"Error":"could not find specific tag"}', status: :not_found
        end

      end

      def show_specific_event
        if Tag.exists?(params[:id])
          render json: Tag.find(params[:id]).events, status: :ok
        else
          render json: '{"Error":"Couldnt find events for specific tag"}', status: :not_found
        end
      end

      def create
        @tag = Tag.new(get_tag_post_variables)

        if @tag.save
          render json: @tag, status: :created
        else
          render json: @tag.errors, status: :unprocessable_entity
        end
      end

      def update

        if Tag.exists?(params[:id])
          @tag = Tag.find(params[:id])

          if @tag.update_attributes(get_tag_post_variables)
            render json: @tag, status: :ok
          else
            render json: @tag.errors, status: :unprocessable_entity
          end
        else
          render json: '{"Error":"Could not find specific tag"}'
        end
      end

      def destroy
        if Tag.exists?(params[:id])
          @tag = Tag.find(params[:id])
          if @tag.destroy && Tag.find(:id).Create_events_tags_table.destroy
            render json: '{"Message":"Tag was deleted"}'
          else
            render json: @tag.errors, status: :unprocessable_entity
          end
        else
          render json: '{"Error":"Could not find specific tag"}'
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
