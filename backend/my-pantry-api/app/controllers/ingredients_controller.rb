class IngredientsController < ApplicationController

    def index
        @ingredients = Ingredient.all 
        render json: @ingredients
    end

    def create
        #Create record in DataBase
        
        @ingredient = Ingredient.create(ingredient_params)  
        render json: @ingredient
    end

    def show
        @ingredient = Ingredient.find(params[:id])
        render json: @ingredient
    end

    def destroy
        @ingredient = Ingredient.find(params[:id])
        @ingredient.destroy
    end

    private
    def ingredient_params
        params.require(:ingredient).permit(:name, :user_id)
    end
end
