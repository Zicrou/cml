json.sys do
  json.id order.id
  json.type order.class.name
  json.created_at order.created_at
  json.updated_at order.updated_at
end

json.extract! order, :status, :amount, :order_id
