class Creator < ActiveRecord::Base
  belongs_to :user

  validates :applikation_name,
            :presence => {:message => "Du måste ange ett namn för applikationen"}

  validates :applikation_description,
            :presence => {:message => "Du måste ange en beskrivning för applikationen"}

end
