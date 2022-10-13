class Api::V1::QuestionCategoriesController < ApiController
  before_action :set_question_category, only: %i[show]

  def index
    @question_categories = QuestionCategory.all.order(created_at: :desc).page(params[:page])
  end

  def show
    render :show
  end

  private

  def set_question_category
    @question_category = QuestionCategory.find_by!(id: params[:id])
  end
end
