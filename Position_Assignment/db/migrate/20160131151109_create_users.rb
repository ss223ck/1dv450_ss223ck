class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|

      t.string :user_name
      t.string :password_digest
      t.string :email
      t.boolean :is_admin , :null => false, :default => false

      t.timestamps
    end
  end
end
