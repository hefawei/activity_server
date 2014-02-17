class CreateActivitySignUps < ActiveRecord::Migration
  def change
    create_table :activity_sign_ups do |t|
      t.string :user_name
      t.string :activity_name
      t.string :sign_up_name
      t.string :sign_up_phone

      t.timestamps
    end
  end
end
