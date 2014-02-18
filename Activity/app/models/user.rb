class User < ActiveRecord::Base

  attr_accessible   :name, :password,:password_confirmation, :token ,:password_question,:password_answer,:administrator
  PASSWORD_MINIMUM = 4
  PASSWORD_MAXIMUM = 12
  before_create {generate_token(:token)}

  validates :name, :presence => true, :uniqueness => {:case_sensitive => false}
  validates :password, :length =>{:minimum => PASSWORD_MINIMUM,:maximum => PASSWORD_MAXIMUM}, :on=>:create
  validates :password, :length =>{:minimum => PASSWORD_MINIMUM,:maximum => PASSWORD_MAXIMUM}, :on=>:update
  has_secure_password
  validates :password_question, :presence => true
  validates :password_answer, :presence => true





  def generate_token(column)
    begin
       self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end

end
