#encoding: utf-8
class SynchronousDatesController < ApplicationController

  PER_PAGE_COUNT = 10

  skip_before_filter :verify_authenticity_token, :only=>[:authenticate_user,
          :synchronous_user_activity_and_bid_dates,:add_new_activity_information,
  :add_new_activity_sign_up_information,:add_new_bid_information,:add_new_bid_sign_up_information]





  def authenticate_user
    user = User.find_by_name(params[:name])
    respond_to do |format|
      if user && user.authenticate(params[:password])
        format.json {render :json=>true}
      else
        format.json {render :json=>false}
      end
    end
  end


  def show_bid_list_view
    @sign_up_number = Activity.where(:user_name=>current_user.name,:name => params[:activity_name]).first.sign_up_number
    @bids = Bid.where(:user_name=>current_user.name,:activity_name=> params[:activity_name]).order('created_at')
    .paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)|| Bid.new
    @count = 0
    if params[:page]
      @count = Integer(((Integer(params[:page])-1) * PER_PAGE_COUNT))
    end
  end

  def show_bid_list_detail_view
    @bid_winners = BidSignUp.where(:user_name => current_user.name,:activity_name=>params[:activity_name],
                                    :bid_name =>params[:bid_name],:IsWinner => true)
    @bid_prices_statistic = BidPriceStatistic.where(:user_name => current_user.name,:activity_name=>params[:activity_name],
      :bid_name =>params[:bid_name]).order('created_at').paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)|| BidPriceStatistic.new
    @bid_name = params[:bid_name]
    @bid_sign_ups = BidSignUp.where(:user_name => current_user.name,:activity_name=>params[:activity_name],
      :bid_name =>params[:bid_name]).order('created_at').paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)|| BidSignUp.new
    @count = 0
    if params[:page]
      @count = Integer(((Integer(params[:page])-1) * PER_PAGE_COUNT))
    end
  end





  def show_activity_sign_up_view
       @activity_sign_ups = ActivitySignUp.where(:user_name => current_user.name,:activity_name =>params[:activity_name]).order('created_at')
      .paginate(page:params[:page],:per_page=>PER_PAGE_COUNT) || ActivitySignUp.new
      @count = 0
      if params[:page]
        @count = Integer(((Integer(params[:page])-1) * PER_PAGE_COUNT))
      end


  end

  def add_new_activity_information
    Activity.create_new_activity_information(params)
    respond_to_client_information
  end

  def add_new_activity_sign_up_information
    ActivitySignUp.create_activity_new_sign_up_information(params)
    respond_to_client_information
  end

  def add_new_bid_information
    Bid.crate_new_bid_information(params)
    respond_to_client_information
  end

  def add_new_bid_sign_up_information
    BidSignUp.create_activity_new_bid_sign_up_information(params)
    respond_to_client_information
  end


  def synchronous_user_activity_and_bid_dates
    synchronous_all_dates
    respond_to_client_information
  end


  private
  def synchronous_all_dates
    Activity.synchronous_user_activities_information(params)
    ActivitySignUp.synchronous_user_activities_sign_up_information(params)
    Bid.synchronous_user_bid_information(params)
    BidSignUp.synchronous_user_bids_sign_up_information(params)
    BidPriceStatistic.get_bid_price_statistic(params)
  end

  def respond_to_client_information
    respond_to do |format|
      format.json {render :json=>true}
    end
  end








end
