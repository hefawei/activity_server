class BidSignUp < ActiveRecord::Base

  attr_accessible :user_name,:activity_name,:bid_name,:sign_up_name,
                  :sign_up_price,:sign_up_phone,:IsWinner  ,:product

  def self.synchronous_user_bids_sign_up_information(params)
    BidSignUp.delete_all(:user_name=>params[:user_name])
    if params[:bid_sign_ups_information]
      bid_sign_up_infos = params[:bid_sign_ups_information]
      bid_sign_up_infos.each do |bid_sign_up_info|
        bid_sign_up_info = BidSignUp.new(bid_sign_up_info)
        bid_sign_up_info.save
      end

    end
  end

  def self.create_activity_new_bid_sign_up_information(params)
    new_bid_sign_ups = params[:new_bid_sign_ups]
    new_bid_sign_up = Bid.new(new_bid_sign_ups.first)
    new_bid_sign_up.save
  end


end
