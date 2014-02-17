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

  def show_dates_synchronous_view
    session[:update_user_id] = nil
    if !current_user
      redirect_to :login
    else
      @users = User.where(:administrator => 'false' ).order('created_at').paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)|| User.new
      @count = 0
      if params[:page]
        @count = Integer(((Integer(params[:page])-1) * PER_PAGE_COUNT))
      end
    end


  end

  def show_activity_sign_up_view

    @activity_sign_ups = ActivitySignUp.where(:user_name => params[:user_name]).order('create_at').paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)||Activity.new
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
  end

  def respond_to_client_information
    respond_to do |format|
      format.json {render :json=>true}
    end
  end








end
