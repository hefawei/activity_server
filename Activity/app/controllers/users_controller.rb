#encoding: utf-8
class UsersController < ApplicationController

  PER_PAGE_COUNT = 10

  def welcome
    if !current_user
      redirect_to :login
      return
    end
    #if !current_user || current_user.administrator=='true'
    #  redirect_to :login
    #  return
    #end

    if current_user.administrator=='true' && params[:user_name]
      go_to_user_welcome_view(params[:user_name])
      return
    end
    go_to_user_welcome_view(current_user.name)
  end

  def register
    @user = User.new
  end

  def login
    session[:user] = nil
    session[:password_answer] = nil
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      cookies.permanent[:token] = @user.token
      redirect_to :action=>'welcome'  #:notice =>"注册成功"
    else
      render :action=>'register'
    end
  end

  def create_login_session
    user = User.find_by_name(params[:user][:name])
    if user && user.authenticate(params[:user][:password])
      administrator_or_user_login(user)
    else
      flash[:error] = "用户名或密码错误"
      redirect_to :action=>'login'
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :action=>'login'  #:notice =>"已经退出登录"
  end

  def forget_password
    session[:user] = nil
    session[:password_answer] = nil


  end

  def reset_password_by_name
    user = User.find_by_name(params[:name])
    if user
      session[:user]=user
      redirect_to :action=>'reset_password_of_question_and_answer'
    else
      flash[:reset_password_error] = "帐号不存在"
      redirect_to :action=>'forget_password'
    end

  end

  def reset_password_of_question_and_answer
    if !session[:user]
       redirect_to :action=>'forget_password'
    else
      @password_question = User.find(session[:user]).password_question
      if session[:password_answer]
      redirect_to :action=>'set_new_password'
      end
    end
  end

  def check_question_and_answer
    answer = User.find(session[:user]).password_answer
    if  answer == params[:password_answer]
      session[:password_answer] = answer
      redirect_to :action=>'set_new_password'
    else
      flash[:reset_password_error] = "忘记密码答案错误"
      redirect_to :action=>'reset_password_of_question_and_answer'
    end

  end

  def set_new_password
    if !session[:password_answer]
      redirect_to :action=>'reset_password_of_question_and_answer'
    end
  end

  def reset_password_after_answer
    user = User.find(session[:user])
    if params[:password].empty?
      flash[:reset_password_error]='密码不能为空'
      redirect_to :'set_new_password'
    else
      user.password = params[:password]
      user.password_confirmation = params[:password_confirmation]
      if user.save
        session[:user]=nil
        session[:password_answer]=nil
        administrator_or_user_login(user)
      else
        flash[:reset_password_error] = user.errors.full_messages.first
        redirect_to :'set_new_password'
      end
    end

  end

  private
  def administrator_or_user_login(user)
    cookies.permanent[:token] = user.token
    if user.administrator=='true'
      redirect_to :'administrator_index'
    else
      redirect_to :action=>'welcome'  #:notice =>"登录成功"
    end

  end

  def will_paginate_view
    @count = 0
    if params[:page]
      @count = Integer(((Integer(params[:page])-1) * PER_PAGE_COUNT))
    end

  end

  def go_to_user_welcome_view(user_name)
    session[:user_name] = user_name
    @activity = Activity.where(:user_name=>session[:user_name]).order('created_at')
    .paginate(page:params[:page],:per_page=>PER_PAGE_COUNT)|| Activity.new
    will_paginate_view

  end





  end
