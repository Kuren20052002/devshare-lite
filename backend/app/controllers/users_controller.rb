class UsersController < ApplicationController
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
end
