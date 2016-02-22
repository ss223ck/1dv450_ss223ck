class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|

      t.references :position
      t.references :creator
      t.references :create_events_tags_table
      t.string :description

      t.timestamps
    end
  end
end
