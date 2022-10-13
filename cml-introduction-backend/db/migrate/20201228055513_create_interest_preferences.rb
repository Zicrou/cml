class CreateInterestPreferences < ActiveRecord::Migration[6.0]
  def change
    create_table :interest_preferences do |t|
      t.belongs_to :interested_by, null: false, foreign_key: { to_table: :event_memberships }
      t.belongs_to :interested_in, null: false, foreign_key: { to_table: :event_memberships }

      t.timestamps
    end
  end
end
