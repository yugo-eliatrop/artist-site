class CreateContacts < ActiveRecord::Migration[5.2]
  def change
    create_table :contacts do |t|
      t.string :service, index: { unique: true }
      t.string :login
      t.string :address

      t.timestamps
    end

    add_index :albums, :name,   unique: true
    add_index :texts, :title,   unique: true
  end
end
