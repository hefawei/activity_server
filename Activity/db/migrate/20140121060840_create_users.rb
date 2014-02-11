class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name
      t.string :password_digest
      t.string :token
      t.string :password_question
      t.string :password_answer
      t.string :administrator,:default => "false"
      t.timestamps
    end
  end
end
