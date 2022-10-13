class Api::V1::QuestionsController < ApiController
  before_action :set_question_category, only: %i[index show]
  before_action :set_question, only: %i[show]
  def index
    @questions = @question_category.questions.all.order(created_at: :desc).page(params[:page])
  end

  def show
    render :show
  end

  private

  def set_question
    @question = @question_category.questions.find_by!(id: params[:id])
  end

  def set_question_category
    @question_category = QuestionCategory.find_by!(id: params[:question_category_id])
  end
end
