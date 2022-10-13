class CreateMemberMatches < ActiveRecord::Migration[6.0]
  def change
    create_table :member_matches do |t|
      t.belongs_to :interested_member_one, null: false, foreign_key: { to_table: :event_memberships }
      t.belongs_to :interested_member_two, null: false, foreign_key: { to_table: :event_memberships }
      t.timestamps
    end
  end
end
