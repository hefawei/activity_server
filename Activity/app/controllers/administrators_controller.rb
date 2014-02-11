#encoding: utf-8
class AdministratorsController < ApplicationController

  PER_PAGE_COUNT = 10


  def administrator_index
    session[:update_user_id] = nil
    if !current_user
       redirect_to :login
    else
      @users = User.where(:administrator => 'false').order('created_at').paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)|| User.new
      @count = 0
      if params[:page]
         @count = Integer(((Integer(params[:page])-1) * PER_PAGE_COUNT))
      end
    end
  end

  def add_user
      @user = User.new
  end

  def create_user
      @user = User.new(user_params)
    if @user.save
      redirect_to :'administrator_index'
    else
      render :'add_user'
    end

  end


  def delete_user
    User.delete(params[:deleted_user_id])
    params[:deleted_user_id]=nil
    redirect_to :'administrator_index'
  end

  def modify_user_information
    if params[:updated_user_id]
      session[:updated_user_id]=params[:updated_user_id]
    end
    if session[:updated_user_id]
      @user_name = User.find(session[:updated_user_id]).name
    else
      redirect_to :'administrator_index'
    end
  end

  def update_user_password
    user = User.find(session[:updated_user_id])
    if params[:password].empty?
      flash[:reset_password_error]='密码不能为空'
      redirect_to :'modify_user_information'
    else
      user.password=params[:password]
      user.password_confirmation= params[:password_confirmation]
      if user.save
        session[:updated_user_id]=nil
        redirect_to :'administrator_index'
      else
        flash[:reset_password_error] = user.errors.full_messages.first
        redirect_to :'modify_user_information'
      end
    end
  end

  private
  def user_params
    params.require(:user).permit(:name,:password,:password_confirmation,:password_question,:password_answer,:administrator)
  end



end