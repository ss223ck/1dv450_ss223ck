module Api
  module V1
    class TagsController < ApplicationController
      respond_to :json
      before_filter :restrict_access
      skip_before_filter  :verify_authenticity_token
      before_filter :get_offset_and_limit

      def index
        @tag = Tag.all

        @tag = @tag.page(1).per(@limit).padding(@offset)
        @next_offset = @offset + @limit
        @next_url = request.base_url + '/api/v1/tags?limit=' + params[:limit] + '&offset=' + @next_offset.to_s

        @response = {next_url: @next_url,
                     requested_tags: @tag}
        render json: @response, status: 200
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

      def get_tag_post_variables
        if params[:name].present?
          params.require(:tag).permit(:name)
        else
          render json: '{"error": "You need to send correct parameters"}', status: :unprocessable_entity
        end
      end

    end
  end
end
