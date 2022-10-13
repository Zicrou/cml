class VerifyAwsUser
  include ActiveModel::Validations

  attr_reader :access_token

  validates :access_token, presence: true

  def initialize(access_token = nil)
    @access_token = access_token
  end

  def call
    raise StandardError if email_verified.nil?

    verify_jwt_access_token
    create_user(user_email, user_looking_for)
    get_current_user(user_email)
    @user[0]
  end

  private

  def cognitoidentityprovider
    Aws::CognitoIdentityProvider::Client.new(
      region: ENV['AWS_REGION']
    )
  end

  def cognito_user
    cognitoidentityprovider.get_user({
                                       access_token: @access_token
                                     })
  end

  def email_verified
    cognito_user.user_attributes
                .detect do |attribute_type|
                  attribute_type['name'] == 'email_verified' && attribute_type['value'] == 'true'
                end
  end

  def get_current_user(email)
    @user = User.where(email: email)
  end

  def create_user(email, looking_for)
    User.create(email: email, looking_for: looking_for)
  end

  def user_email
    cognito_user.user_attributes.detect { |attrs| attrs['name'] == 'email' }&.value
  end

  def user_looking_for
    cognito_user.user_attributes.detect { |attrs| attrs['name'] == 'custom:lookingFor' }&.value
  end

  def verify_jwt_access_token
    aws_idp = Faraday.get(verification_url).body
    jwt_config = JSON.parse(aws_idp, symbolize_names: true)
    JWT.decode(@access_token, nil, true, { jwks: jwt_config, algorithms: ['RS256'] })
  end

  def verification_url
    "https://cognito-idp.#{ENV['AWS_REGION']}.amazonaws.com/#{ENV['AWS_USER_POOL_ID']}/.well-known/jwks.json"
  end
end
