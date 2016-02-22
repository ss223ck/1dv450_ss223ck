class Creator < ActiveRecord::Base
  belongs_to :user
  before_create :generate_access_token

  validates :applikation_name,
            :presence => {:message => "Du måste ange ett namn för applikationen"}

  validates :applikation_description,
            :presence => {:message => "Du måste ange en beskrivning för applikationen"}
  private

  def generate_access_token
    begin
      self.applikation_api = SecureRandom.hex
    end while self.class.exists?(applikation_api: applikation_api)
  end

end
