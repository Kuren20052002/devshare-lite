class Users::SessionsController < Devise::SessionsController
  respond_to :json

  before_action :authenticate_user!, only: [ :verify_token ]

  def verify_token
    render json: {
      status: { code: 200, message: "Token is valid." },
      data: UserSerializer.new(current_user).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  private

  def respond_with(resource, _opts = {})
    token = request.env["warden-jwt_auth.token"]

    render json: {
      status: { code: 200, message: "Logged in successfully." },
      token: token,
      data: UserSerializer.new(resource).serializable_hash[:data][:attributes]
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: 200,
        message: "logged out successfully"
      }, status: :ok
    else
      render json: {
        status: 401,
        message: "Couldn't find an active session."
      }, status: :unauthorized
    end
  end
end
