class User < ActiveRecord::Base

  has_secure_password

  validates :user_name,
            :presence => {:message => "Du måste ange ett förnamn"},
            :uniqueness => true

  validates :password,
            :presence => {:message => "Du måste ange ett lösenord"}

  validates :password_confirmation,
            :presence => {:message => "Du måste ange ett samma lösenord igen"}

  validates :email,
            :presence => {:message => "Du måste ange en email"},
            :uniqueness => true
end
