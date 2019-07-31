class RemoveRecipeIdFromIngredients < ActiveRecord::Migration[5.2]
  def change
    remove_column :ingredients, :recipe_id, :foreign_key
  end
end
