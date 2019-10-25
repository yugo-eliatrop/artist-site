class CreateSettings < ActiveRecord::Migration[5.2]
  def change
    create_table :settings do |t|
      t.string :option, index: { unique: true }
      t.jsonb :value
    end
  end
end
