class Api::V1::UsersController < ApiController
  before_action :restrict_to_admin_role, only: %i[index]

  def index
    @users = search_user
    @users = @users.merge(find_min_max_age) unless params[:min_age].nil? && params[:max_age].nil?
    @users = @users.merge(find_user_by_event_count) unless params[:past_event_attended].nil?
    @users = @users.per(1_000_00)
  end

  private

  def find_min_max_age
    min_age = params[:min_age].to_i.years
    max_age = params[:max_age].to_i.years
    User.joins(:demographic).where('date_of_birth >= ? AND date_of_birth <= ?',
                                   Date.today - max_age - 1.year, Date.today - min_age)
  end

  def search_user
    User.search_for(params[:name])
        .search_for(params[:previously_married])
        .search_for(params[:looking_for])
        .where(admin: false).order(created_at: :desc).page(params[:page])
  end

  def find_user_by_event_count
    User.joins(:event_memberships, :demographic)
        .group('users.id', 'demographics.id').having('count(*) = ?', params[:past_event_attended].to_i)
  end

  def restrict_to_admin_role
    return true if current_user.admin?

    render json: { message: 'Not allowed' }, status: :forbidden and return false
  end
end
