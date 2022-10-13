class Api::V1::AnswersController < ApiController
  before_action :set_question_category, only: %i[create]
  before_action :set_question, only: %i[create]
  before_action :set_user, only: %i[index]
  before_action :set_answer, only: %i[update show]
  before_action :record_params, only: %i[back]

  def index
    @answers = @user.answers.all.order(created_at: :desc).page(params[:page]).per(50)
  end

  def back
    @backs = current_user.answers.all.where(record_name: record_params)
  end

  def show
    render :show
  end

  def create
    @answer = @question.answers.new(answer_params)
    @answer.user_id = current_user.id

    if @answer.save
      render :show
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  def update
    if @answer.update(answer_params)
      render :show
    else
      render json: @answer.errors, status: :unprocessable_entity
    end
  end

  private

  def set_question_category
    @question_category = QuestionCategory.find_by!(id: params[:question_category_id])
  end

  def set_question
    @question = @question_category.questions.find_by!(id: params[:question_id])
  end

  def answer_params
    params.require(:answer).permit(:answer_type, :response, :sort_id, :record_name)
  end

  def record_params
    params[:record_name]
  end

  def set_user
    @user = if params[:user_id] == 'me'
              current_user
            else
              User.find_by_id(params[:user_id])
            end
  end

  def set_answer
    @answer = current_user.answers.find(params[:id])
  end
end
