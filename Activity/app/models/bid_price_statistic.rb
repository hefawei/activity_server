class BidPriceStatistic < ActiveRecord::Base
  attr_accessible :user_name , :activity_name , :bid_name , :bid_price , :price_number  ,:product

  def self.get_bid_price_statistic(params)
    BidPriceStatistic.delete_all(:user_name => params[:user_name])
    if params[:bid_price_statistic]
      prices_statistic = params[:bid_price_statistic]
      prices_statistic.each do |price_statistic|
        price_statistics = BidPriceStatistic.new(price_statistic)
        price_statistics.save
      end
    end

  end



end
