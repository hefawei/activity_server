class User < ActiveRecord::Base

  attr_accessible   :name, :password,:password_confirmation, :token ,:password_question,:password_answer

  before_create {generate_token(:token)}

  validates :name, :presence => true, :uniqueness => {:case_sensitive => false}
  has_secure_password
  validates :password, :length =>{:minimum => 6}, :on=>:create
  validates :password_question, :presence => true, :uniqueness => {:case_sensitive => false}
  validates :password_answer, :presence => true, :uniqueness => {:case_sensitive => false}





  def generate_token(column)
    begin
      self[column] = SecureRandom.urlsafe_base64
    end while User.exists?(column => self[column])
  end
end
