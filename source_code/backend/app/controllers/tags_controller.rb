class TagsController < ApplicationController
  def index
    tags = Tag.select(:id, :name)
    render json: tags
  end
end
