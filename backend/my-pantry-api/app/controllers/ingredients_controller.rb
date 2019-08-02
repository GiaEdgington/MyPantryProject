class IngredientsController < ApplicationController

    def index
        @ingredients = Ingredient.all 
        render json: @ingredients
    end

    def create
        #Create record in DataBase
        
        @ingredient = Ingredient.create(ingredient_params)  
        render json: { name: @ingredient.name }
    end

    private
    def ingredient_params
        params.require(:ingredient).permit(:name, :user_id)
    end
end
