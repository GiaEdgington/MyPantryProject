class RecipesController < ApplicationController

    def create
        @recipe = Recipe.create(recipe_params)
        render json: @recipe
    end

    def destroy
        @recipe = Recipe.find(params[:id])
        @recipe.destroy
    end

    private

    def recipe_params
        params.require(:recipe).permit(:title, :intructions)
    end
end
