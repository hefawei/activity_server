class Activity < ActiveRecord::Base

  attr_accessible  :user_name,:name,:status, :bid_number,:sign_up_number ,  :product

  def self.synchronous_user_activities_information(params)
    Activity.delete_all(:user_name=>params[:user_name])
    if params[:all_activities]
      activities_information = params[:all_activities]
      activities_information.each do |activity_information|
        activity_info = Activity.create(activity_information)
        #activity_info.save
      end
    end

  end

  def self.create_new_activity_information(params)
    new_activities = params[:new_activities]
    new_activity = Activity.new(new_activities.first)
    new_activity.save
  end

end
