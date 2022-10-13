# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2022_02_23_123721) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_admin_comments", force: :cascade do |t|
    t.string "namespace"
    t.text "body"
    t.string "resource_type"
    t.bigint "resource_id"
    t.string "author_type"
    t.bigint "author_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["author_type", "author_id"], name: "index_active_admin_comments_on_author_type_and_author_id"
    t.index ["namespace"], name: "index_active_admin_comments_on_namespace"
    t.index ["resource_type", "resource_id"], name: "index_active_admin_comments_on_resource_type_and_resource_id"
  end

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.string "service_name", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "admin_users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["email"], name: "index_admin_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_admin_users_on_reset_password_token", unique: true
  end

  create_table "answers", force: :cascade do |t|
    t.string "answer_type"
    t.text "response"
    t.integer "sort_id"
    t.bigint "question_id", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "record_name"
    t.index ["question_id"], name: "index_answers_on_question_id"
    t.index ["user_id"], name: "index_answers_on_user_id"
  end

  create_table "demographics", force: :cascade do |t|
    t.string "person_name"
    t.date "date_of_birth"
    t.string "ethnic_background"
    t.string "denomination"
    t.string "address"
    t.string "telephone"
    t.string "demographic_image"
    t.string "highest_education"
    t.string "citizenship_status"
    t.string "occupation"
    t.string "previously_married"
    t.string "divorced"
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_demographics_on_user_id"
  end

  create_table "event_memberships", force: :cascade do |t|
    t.boolean "paid"
    t.bigint "user_id", null: false
    t.bigint "event_id", null: false
    t.bigint "order_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_event_memberships_on_event_id"
    t.index ["order_id"], name: "index_event_memberships_on_order_id"
    t.index ["user_id"], name: "index_event_memberships_on_user_id"
  end

  create_table "events", force: :cascade do |t|
    t.string "title"
    t.string "event_type"
    t.datetime "date_time"
    t.string "event_code"
    t.string "address_location"
    t.integer "fees"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "pdf_file"
  end

  create_table "interest_preferences", force: :cascade do |t|
    t.bigint "interested_by_id", null: false
    t.bigint "interested_in_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["interested_by_id"], name: "index_interest_preferences_on_interested_by_id"
    t.index ["interested_in_id"], name: "index_interest_preferences_on_interested_in_id"
  end

  create_table "invitations", force: :cascade do |t|
    t.string "email"
    t.string "status"
    t.string "invitation_code"
    t.bigint "user_id", null: false
    t.bigint "event_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["event_id"], name: "index_invitations_on_event_id"
    t.index ["user_id"], name: "index_invitations_on_user_id"
  end

  create_table "member_matches", force: :cascade do |t|
    t.bigint "interested_member_one_id", null: false
    t.bigint "interested_member_two_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["interested_member_one_id"], name: "index_member_matches_on_interested_member_one_id"
    t.index ["interested_member_two_id"], name: "index_member_matches_on_interested_member_two_id"
  end

  create_table "orders", force: :cascade do |t|
    t.string "status"
    t.decimal "amount"
    t.string "order_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "question_categories", force: :cascade do |t|
    t.string "title"
    t.integer "sort_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "questions", force: :cascade do |t|
    t.string "title"
    t.integer "sort_id"
    t.boolean "is_public", default: true
    t.bigint "question_category_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["question_category_id"], name: "index_questions_on_question_category_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "looking_for"
    t.boolean "admin", default: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "answers", "users"
  add_foreign_key "demographics", "users"
  add_foreign_key "event_memberships", "events"
  add_foreign_key "event_memberships", "orders"
  add_foreign_key "event_memberships", "users"
  add_foreign_key "interest_preferences", "event_memberships", column: "interested_by_id"
  add_foreign_key "interest_preferences", "event_memberships", column: "interested_in_id"
  add_foreign_key "invitations", "events"
  add_foreign_key "invitations", "users"
  add_foreign_key "member_matches", "event_memberships", column: "interested_member_one_id"
  add_foreign_key "member_matches", "event_memberships", column: "interested_member_two_id"
  add_foreign_key "questions", "question_categories"
end
