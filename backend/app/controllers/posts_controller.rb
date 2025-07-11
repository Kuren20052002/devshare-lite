class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]

  def index
    @posts = Post.all
    render json: @posts.as_json(methods: [ :content_html ])
  end

  def show
    render json: @post.as_json(methods: [ :content_html ])
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      render json: @post.as_json(methods: [ :content_html ]), status: :created, location: @post
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      render json: @post.as_json(methods: [ :content_html ])
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy
    head :no_content
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :content)
    end
end
