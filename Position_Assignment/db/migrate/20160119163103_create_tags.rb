class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.references :create_events_tags_table
      t.string :name, :limit => 40

      t.timestamps
    end
  end
end