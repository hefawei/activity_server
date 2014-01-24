#encoding: utf-8
class UsersController < ApplicationController
  def welcome
  end

  def register
    @user = User.new
  end

  def login
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
      cookies.permanent[:token] = user.token
      redirect_to :action=>'welcome'  #:notice =>"登录成功"
    else
      flash[:error] = "用户名或密码错误"
      redirect_to :action=>'login'
    end
  end

  def logout
    cookies.delete(:token)
    redirect_to :action=>'login'  #:notice =>"已经退出登录"
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

  def check_question_and_answer
    answer = User.find(session[:user]).password_answer
    if  answer == params[:password_answer]
        session[:password_answer] = answer
        redirect_to :action=>'login'
    else
        flash[:reset_password_error] = "忘记密码答案错误"
        redirect_to :action=>'reset_password_of_question_and_answer'
    end

  end



  def reset_password_of_question_and_answer
    if !session[:user]
       redirect_to :action=>'forget_password'
    else
      @password_question = User.find(session[:user]).password_question
      session[:password_answer]
      render :action=>'reset_password_of_question_and_answer'
    end
  end



  end
