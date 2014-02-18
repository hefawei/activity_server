class CreateActivities < ActiveRecord::Migration
  def change
    create_table :activities do |t|
      t.string :user_name
      t.string :name
      t.string :status
      t.integer :bid_number
      t.integer :sign_up_number

      t.timestamps
    end
  end
end
