class AddPdfFileToEvents < ActiveRecord::Migration[6.1]
  def change
    add_column :events, :pdf_file, :string
  end
end
