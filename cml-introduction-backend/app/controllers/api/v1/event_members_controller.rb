class Api::V1::EventMembersController < ApiController
  before_action :set_event

  def index
    @event_members = User.joins(:event_memberships).where(event_memberships: { event_id: @event.id })
                         .order(created_at: :desc).page(params[:page])
  end

  private

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end
end
