class CreateBidSignUps < ActiveRecord::Migration
  def change
    create_table :bid_sign_ups do |t|
      t.string :user_name
      t.string :activity_name
      t.string :bid_name
      t.string :sign_up_name
      t.integer :sign_up_price
      t.string :sign_up_phone
      t.boolean :IsWinner

      t.timestamps
    end
  end
end
