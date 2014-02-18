class CreateBidPriceStatistics < ActiveRecord::Migration
  def change
    create_table :bid_price_statistics do |t|
      t.string :user_name
      t.string :activity_name
      t.string :bid_name
      t.string :bid_price
      t.string :price_number

      t.timestamps
    end
  end
end
