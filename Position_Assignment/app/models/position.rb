class Position < ActiveRecord::Base
  geocoded_by :address
end
