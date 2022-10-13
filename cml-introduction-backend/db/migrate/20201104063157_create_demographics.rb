class CreateDemographics < ActiveRecord::Migration[6.0]
  def change
    create_table :demographics do |t|
      t.string :person_name
      t.date :date_of_birth
      t.string :ethnic_background
      t.string :denomination
      t.string :address
      t.string :telephone
      t.string :demographic_image
      t.string :highest_education
      t.string :citizenship_status
      t.string :occupation
      t.string :previously_married
      t.string :divorced
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
