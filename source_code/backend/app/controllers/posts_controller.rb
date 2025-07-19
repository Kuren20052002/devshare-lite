class PostsController < ApplicationController
  before_action :set_post, only: %i[show update destroy]
  before_action :authenticate_user!, except: [ :show ]
  before_action :authorize_owner!, only: %i[update destroy]

  def index
    posts = Post.includes(:tags, :user)

    if params[:user_id].present?
      posts = posts.where(user_id: params[:user_id])
    else
      posts = posts.where("title ILIKE ?", "%#{params[:query]}%") if params[:query].present?
    end

    posts = posts.order(created_at: :desc)
    paginated = posts.page(params[:page] || 1)

    render json: {
      posts: paginated.as_json(
        include: [
          { tags: { only: %i[id name] } },
          { user: { methods: [ :avatar_url ], only: %i[id first_name last_name] } }
        ]
      ),
      meta: {
        current_page: paginated.current_page,
        total_pages: paginated.total_pages,
        total_count: paginated.total_count
      }
    }
  end

  def show
    render json: @post.as_json(
      methods: [ :content_html ],
      include: {
        tags: { only: %i[id name] },
        user: { methods: [ :avatar_url ], only: %i[id first_name last_name] }
      }
    )
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
    if @post.update(post_params.merge(content: params[:content]))
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
    params.require(:post).permit(:title, :content)
  end

  def attach_tags(post)
    tag_names = params.dig(:post, :tag_names)
    return unless tag_names.present?

    tags = tag_names.first(5).map { |name| Tag.find_or_create_by(name: name.downcase.strip) }
    post.tags = tags
  end

  def authorize_owner!
    return if @post.user_id == current_user.id

    render json: { error: "You are not authorized to perform this action." }, status: :unauthorized
  end
end
