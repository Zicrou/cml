class Api::V1::EventsController < ApiController
  before_action :set_event, only: %i[show update destroy]
  before_action :restrict_to_admin_role, only: %i[create update destroy]

  def index
    @events = fetch_all_events
    @events = @events.merge(Event.expired) if params[:status] == 'expired'
    @events = @events.merge(Event.active) if params[:status] == 'active'
  end

  def show
    render :show
  end

  def create
    @event = Event.create(event_params)
    @event.event_code = generate_event_code
    save_event
  end

  def update
    if @event.update(event_params)
      render :show
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @event.destroy
  end

  private

  def event_params
    params.require(:event).permit(:title, :date_time, :address_location, :fees, :event_type)
  end

  def generate_event_code
    Faker::Alphanumeric.unique.alphanumeric(number: 4)
  end

  def save_event
    if @event.save
      render :show, status: :created
    else
      render json: @event.errors, status: :unprocessable_entity
    end
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def restrict_to_admin_role
    return true if current_user.admin?

    render json: { message: 'Not allowed' }, status: :forbidden and return false
  end

  def fetch_all_events
    Event.search_for(params[:event_code]).order(created_at: :desc).page(params[:page])
  end
end
