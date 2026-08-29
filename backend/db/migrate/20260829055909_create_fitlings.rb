class CreateFitlings < ActiveRecord::Migration[8.1]
  def change
    create_table :fitlings do |t|
      t.references :user, null: false, foreign_key: true, index: { unique: true }
      t.string :name, null: false
      t.integer :level, null: false, default: 1
      t.integer :xp, null: false, default: 0
      t.integer :strength, null: false, default: 0
      t.integer :stamina, null: false, default: 0
      t.integer :discipline, null: false, default: 0
      t.integer :confidence, null: false, default: 0
      t.integer :flexibility, null: false, default: 0
      t.integer :style, null: false, default: 0
      t.integer :recovery, null: false, default: 0

      t.timestamps
    end
  end
end
