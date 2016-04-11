class CreateCreators < ActiveRecord::Migration
  def change
    create_table :creators do |t|
      t.references :user

      t.string :applikation_name, :limit => 30
      t.string :applikation_api
      t.string :applikation_description
      t.string :password_digest

      t.timestamps
    end
  end
end
