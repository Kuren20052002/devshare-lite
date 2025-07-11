class PostsController < ApplicationController
  before_action :set_post, only: %i[ show update destroy ]
  before_action :authenticate_user!, except: [ :index, :show ]
  def index
    @posts = Post.all
    render json: @posts.as_json(methods: [ :content_html ])
  end

  def show
    render json: @post.as_json(methods: [ :content_html ])
  end

  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      attach_tags(@post)
      render json: @post.as_json(methods: [ :content_html ]), status: :created
    else
      render json: @post.errors, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      attach_tags(@post)
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
      params.require(:post).permit(:title, :content, tag_names: [])
    end

    def attach_tags(post)
      tag_names = params[:post][:tag_names].first(5) # chỉ lấy tối đa 5 tags
      tags = tag_names.map { |name| Tag.find_or_create_by(name: name.downcase.strip) }
      post.tags = tags
    end
end
