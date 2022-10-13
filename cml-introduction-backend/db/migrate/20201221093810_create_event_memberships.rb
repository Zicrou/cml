class CreateEventMemberships < ActiveRecord::Migration[6.0]
  def change
    create_table :event_memberships do |t|
      t.boolean :paid
      t.references :user, null: false, foreign_key: true
      t.references :event, null: false, foreign_key: true
      t.references :order, null: false, foreign_key: true

      t.timestamps
    end
  end
end
