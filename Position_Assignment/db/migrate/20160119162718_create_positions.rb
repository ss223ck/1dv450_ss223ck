class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|

      t.string :location_name
      t.float :longitude
      t.float :latitude

      t.timestamps
    end
  end
end
