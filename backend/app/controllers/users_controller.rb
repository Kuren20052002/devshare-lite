class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    render json: @user.as_json(
      only: [ :id, :username, :email ],
      methods: [ :profile_picture_url ],
      include: {
        posts: {
          only: [ :id, :title, :created_at ],
          methods: [ :content_html ],
          include: {
            tags: { only: [ :id, :name ] }
          }
        }
      }
    )
  end
end
