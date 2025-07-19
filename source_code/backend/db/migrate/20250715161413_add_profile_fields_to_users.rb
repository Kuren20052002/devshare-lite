class AddProfileFieldsToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :bio, :text
    add_column :users, :facebook, :string
    add_column :users, :github, :string
    add_column :users, :linkedin, :string
  end
end
