class Api::V1::MeController < ApiController
  def index
    render json: current_user.id, status: :ok
  end
end
