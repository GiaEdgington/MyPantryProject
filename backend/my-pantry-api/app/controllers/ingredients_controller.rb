class IngredientsController < ApplicationController

    def index
        @ingredients = Ingredient.all 
        render json: @ingredients
    end


    
    def create
        @ingredient = Ingredient.create(ingredient_params)
        temp = params[:user_id]
        found = User.find(temp)
        # render json: @ingredient
        allIngredients = found.ingredients
        render json: {ingredient: @ingredient, all: allIngredients}
        
    end


    private
    
    def ingredient_params
        params.require(:ingredient).permit(:name, :user_id)
    end
end
