class CreateOrders < ActiveRecord::Migration[6.0]
  def change
    create_table :orders do |t|
      t.string :status
      t.decimal :amount
      t.string :order_id

      t.timestamps
    end
  end
end
