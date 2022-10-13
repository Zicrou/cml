class Api::V1::OrdersController < ApiController
  before_action :set_event
  before_action :validate_user_invited
  before_action :validate_user_event_membership

  def verify_order
    Rollbar.info('Paypal Order transactions', { PayPalOrderId: params[:order_id] })
    if @event.event_type == 'paid'
      paid_event_order
    else
      free_event_order
    end
  rescue PayPalHttp::HttpError => e
    render json: { paypal_debug_id: e.headers['paypal-debug-id'], paypal_response_header: e.headers },
           status: e.status_code
  end

  private

  def order_status
    verify_paypal_order.result.status
  end

  def order_amount
    verify_paypal_order.result.purchase_units[0].amount.value
  end

  def order_id_response
    verify_paypal_order.result.id
  end

  def order_id
    params[:order_id]
  end

  def verify_paypal_order
    @verify_paypal_order ||= VerifyPaypalOrder.new(order_id).call
  end

  def set_event
    @event = Event.find_by!(id: params[:event_id])
  end

  def free_event_order
    @order = Order.new(status: 'free', amount: 0, order_id: nil)
    if @order.save
      current_user.event_memberships.create(paid: false, event_id: @event.id, order_id: @order.id)
      render :show
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def paid_event_order
    if order_status == 'COMPLETED'
      @order = Order.new(status: order_status, amount: order_amount, order_id: order_id_response)
      create_paid_event_order
    else
      render json: 'Your Payment is not completed', status: :payment_required
    end
  end

  def create_paid_event_order
    if @order.save
      current_user.event_memberships.create(paid: true, event_id: @event.id, order_id: @order.id)
      render :show
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  def validate_user_invited
    if @event.invitations.where(user_id: current_user.id).exists?
      true
    else
      render json: 'not found', status: :not_found
    end
  end

  def validate_user_event_membership
    if @event.event_memberships.where(user_id: current_user.id).exists?
      render json: 'You have already joined this event', status: :found
    else
      true
    end
  end
end
