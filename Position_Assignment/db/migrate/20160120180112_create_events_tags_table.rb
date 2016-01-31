class CreateEventsTagsTable < ActiveRecord::Migration
  def up
    create_table :events_tags, :id => false do |t|
      t.integer "event_id"
      t.integer "tag_id"
    end

    add_index :events_tags, ["event_id", "tag_id"]

  end

  def down
    drop_table :events_tags
  end
end
