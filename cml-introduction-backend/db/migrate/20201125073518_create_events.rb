class CreateEvents < ActiveRecord::Migration[6.0]
  def change
    create_table :events do |t|
      t.string :title
      t.string :event_type
      t.datetime :date_time
      t.string :event_code
      t.string :address_location
      t.integer :fees

      t.timestamps
    end
  end
end
