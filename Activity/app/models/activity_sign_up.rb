class ActivitySignUp < ActiveRecord::Base

  attr_accessible :user_name,:activity_name,:sign_up_name,:sign_up_phone ,:product


  def self.synchronous_user_activities_sign_up_information(params)
    ActivitySignUp.delete_all(:user_name=>params[:user_name])
    if params[:activity_sign_ups_information]
      activity_sign_up_infos = params[:activity_sign_ups_information]
      activity_sign_up_infos.each do |activity_sign_up_info|
        activity_sign_up_info = ActivitySignUp.new(activity_sign_up_info)
        activity_sign_up_info.save
      end

    end
  end

  def self.create_activity_new_sign_up_information(params)
    activity_sign_ups = params[:new_activity_sign_ups]
    activity_sign_up = ActivitySignUp.new(activity_sign_ups.first)
    activity_sign_up.save
  end

end
