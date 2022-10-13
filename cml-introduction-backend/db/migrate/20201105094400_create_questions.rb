class CreateQuestions < ActiveRecord::Migration[6.0]
  def change
    create_table :questions do |t|
      t.string :title
      t.integer :sort_id
      t.boolean :is_public, default: true
      t.references :question_category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
