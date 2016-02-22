# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
#admin = User.create
#admin.user_name = "admin"
#admin.password = "123"
#admin.password_confirmation = "123"
#admin.is_admin = true
#admin.save

#user = User.create
#user.user_name = "user"
#user.password = "321"
#user.password_confirmation = "321"
#user.is_admin = false
#user.save

require 'faker'

start = Time.now

User.destroy_all
Creator.destroy_all

admin = User.create!({
                         user_name: "admin",
                         password: "test",
                         password_confirmation: "test",
                         email: "fake@mail.com",
                         is_admin: true
                     })

p "Created 1 admin"

100.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  User.create! ({
      user_name: Faker::Internet.user_name + Faker::Lorem.word,
      password: "test",
      password_confirmation: "test",
      email: Faker::Internet.email(first_name + "." + last_name),
      is_admin: false
  })
end

p "Created #{User.count} users"

100.times do
  Creator.create!({
                      user_id: User.all.ids.sample,
                      applikation_name: Faker::App.name,
                      applikation_description: Faker::Hacker.say_something_smart
                  })
end

p "Created #{Creator.count} api keys"

p "Seed created in #{Time.now - start} seconds"