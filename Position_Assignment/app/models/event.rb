class Event < ActiveRecord::Base
  has_and_belongs_to_many :tags
  belongs_to :position
  belongs_to :creator
end