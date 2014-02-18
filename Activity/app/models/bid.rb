class Bid < ActiveRecord::Base

  attr_accessible :user_name,:activity_name,:bid_people_number,:bid_name,:status    ,:product

  def self.synchronous_user_bid_information(params)
    Bid.delete_all(:user_name=>params[:user_name])
    if params[:all_bids]
      bids_information = params[:all_bids]
      bids_information.each do |bid_information|
        bid_info = Bid.new(bid_information)
        bid_info.save
      end

    end
  end

  def self.crate_new_bid_information(params)
    new_bids = params[:new_bids]
    new_bid = Bid.new(new_bids.first)
    new_bid.save
  end

end
