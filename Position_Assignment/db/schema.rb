# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160131151109) do

  create_table "creators", force: true do |t|
    t.integer  "user_id"
    t.string   "applikation_name", limit: 30
    t.string   "applikation_api"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.integer  "position_id"
    t.integer  "creator_id"
    t.integer  "create_events_tags_table_id"
    t.string   "Description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events_tags", id: false, force: true do |t|
    t.integer "event_id"
    t.integer "tag_id"
  end

  add_index "events_tags", ["event_id", "tag_id"], name: "index_events_tags_on_event_id_and_tag_id"

  create_table "positions", force: true do |t|
    t.float    "longitude"
    t.float    "latitude"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tags", force: true do |t|
    t.integer  "create_events_tags_table_id"
    t.string   "name",                        limit: 20
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "user_name"
    t.string   "password_digest"
    t.string   "email"
    t.integer  "is_admin",        null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
