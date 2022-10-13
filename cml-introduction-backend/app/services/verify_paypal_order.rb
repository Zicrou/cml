class VerifyPaypalOrder
  attr_reader :order_id

  def initialize(order_id)
    @order_id = order_id
    client_id = ENV['PAYPAL_CLIENT_ID']
    client_secret = ENV['PAYPAL_SECRET']
    environment = PayPal::LiveEnvironment.new(client_id, client_secret)
    @client = PayPal::PayPalHttpClient.new(environment)
  end

  def call
    @client.execute(order_request)
  end

  private

  def order_request
    PayPalCheckoutSdk::Orders::OrdersGetRequest.new(@order_id)
  end
end
