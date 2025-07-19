class UsersController < ApplicationController
  before_action :authenticate_user!, only: [ :update_info ]
  def show
    @user = User.find(params[:id])
    render json: @user.as_json(
      only: [ :id, :username, :email, :first_name, :last_name, :github, :facebook, :linkedin, :bio ],
      methods: [ :avatar_url, :cover_picture_url ],
      include: {
        posts: {
          only: [ :id, :title, :created_at ],
          include: {
            tags: { only: [ :id, :name ] }
          }
        }
      }
    )
  end

  def update_info
    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: { message: "User info successfully updated", user: @user.as_json(
        only: [ :id, :username, :email, :first_name, :last_name, :github, :facebook, :linkedin, :bio ],
        methods: [ :avatar_url, :cover_picture_url ]
      ) }, status: :ok
    else
      render json: { error: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :avatar, :cover_picture, :first_name, :last_name, :github, :facebook, :linkedin, :bio)
  end
end
