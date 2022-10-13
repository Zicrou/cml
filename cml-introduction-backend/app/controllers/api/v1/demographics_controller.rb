class Api::V1::DemographicsController < ApiController
  before_action :set_user, only: %i[show]
  before_action :check_demographic, only: %i[create]

  def create
    @demographic = current_user.build_demographic(demographic_params)
    @demographic.demographic_image.attach(data: demographic_image_params[:demographic_image])
    if @demographic.save
      CongratulationMailer.congratulation_email(current_user).deliver_now
      render :show, status: :created
    else
      render json: @demographic.errors, status: :unprocessable_entity
    end
  end

  def update
    @demographic = current_user.demographic
    if @demographic.update(demographic_params)
      update_image
      render :show
    else
      render json: @demographic.errors, status: :unprocessable_entity
    end
  end

  def show
    @demographic = @user.demographic
    if @demographic.present?
      render :show
    else
      render json: 'Demographic not found', status: :not_found
    end
  end

  private

  def check_demographic
    return unless current_user.demographic.present?

    render json: 'demographic already exist', status: :conflict
  end

  def demographic_params
    params.require(:demographic).permit(:person_name, :date_of_birth,
                                        :ethnic_background, :denomination,
                                        :address, :telephone,
                                        :highest_education, :citizenship_status,
                                        :occupation, :previously_married,
                                        :divorced)
  end

  def demographic_image_params
    params.require(:demographic).permit(:demographic_image)
  end

  def update_image
    return if demographic_image_params[:demographic_image].nil?

    if demographic_image_params[:demographic_image] == 'close'
      @demographic.demographic_image.purge
    else
      @demographic.demographic_image.attach(data: demographic_image_params[:demographic_image])
    end
  end

  def set_user
    @user = if params[:user_id] == 'me'
              current_user
            else
              User.find_by_id(params[:user_id])
            end
  end
end
