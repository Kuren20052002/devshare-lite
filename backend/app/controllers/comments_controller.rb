class CommentsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :replies_for_comment ]
  before_action :set_post, only: [ :index, :create, :replies_for_comment ]
  before_action :set_comment, only: [ :update, :destroy ]

  def index
    @root_comments = @post.comments.root_comments.includes(:replies)
    render json: @root_comments.as_json(
      only: [ :id, :content ],
      methods: [ :have_children ],
      include: {
        user: {
          only: [ :first_name, :last_name ],
          methods: [ :avatar_url ]
        },
        post: {
          only: [ :id ]
        }
      }
    )
  end

  def create
    @comment = @post.comments.build(comment_params)
    @comment.user = current_user

    if @comment.save
      render json: @comment.as_json(
        only: [ :id, :content ],
        methods: [ :have_children ],
        include: {
          user: {
            only: [ :first_name, :last_name ],
            methods: [ :avatar_url ]
          },
          post: {
            only: [ :id ]
          }
        }
      )
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def update
    if @comment.update(comment_params)
      render json: @comment, status: :ok
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @comment.destroy
    head :no_content
  end

  def replies_for_comment
    @parent_comment = @post.comments.find(params[:id])
    @replies = @parent_comment.replies
    render json: @replies.as_json(
      only: [ :id, :parent_id, :content ],
      methods: [ :have_children ],
      include: {
        user: { only: [ :first_name, :last_name ],
                methods: [ :avatar_url ] },
        post: { only: [ :id ] }
      }
    )
  end

  private

  def set_post
    @post = Post.find(params[:post_id])
  end

  def set_comment
    @comment = current_user.comments.find(params[:id])
  end

  def comment_params
    params.require(:comment).permit(:content, :parent_id)
  end
end
