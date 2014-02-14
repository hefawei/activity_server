#encoding: utf-8
class UsersController < ApplicationController
  skip_before_filter :verify_authenticity_token, :only=>[:authenticate_user]

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
      session[:password_answer]
      render :action=>'reset_password_of_question_and_answer'
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



  end
