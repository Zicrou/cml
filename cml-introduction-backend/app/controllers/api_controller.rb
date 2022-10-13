class ApiController < ActionController::API
  rescue_from ActionController::RoutingError, with: :permission_denied
  rescue_from ActiveRecord::RecordNotFound, with: :permission_denied
  rescue_from NoMethodError, with: :permission_denied
  rescue_from PayPalHttp::HttpError, with: :permission_denied
  rescue_from Errno::ENOTDIR, with: :permission_denied
  before_action :current_user
  before_action :deep_underscore_params!

  def current_user
    cache_id = Rails.cache.fetch(request.headers['access-token'], expires_in: cache_exprires_in.minutes) do
      aws_user&.id
    end
    fetch_user_by_cached_id(cache_id)
  end
  helper_method :current_user

  private

  def aws_user
    VerifyAwsUser.new(request.headers['access-token']).call
  rescue StandardError
    nil
  end

  def cache_exprires_in
    Rails.env.production? ? 1 : 4
  end

  def fetch_user_by_cached_id(cache_id)
    if cache_id.nil?
      Rails.cache.delete(request.headers['access-token'])
      render json: 'unauthorized user', status: :unauthorized
    else
      User.find_by_id(cache_id)
    end
  end

  def deep_underscore_params!(app_params = params)
    app_params.transform_keys!(&:underscore)
    app_params.each do |_key, value|
      deep_underscore_params!(value) if value.instance_of?(ActionController::Parameters)
    end
    app_params.reject! { |_k, v| v.blank? }
  end

  def permission_denied
    render plain: 'Error occur', status: 403
  end
end
