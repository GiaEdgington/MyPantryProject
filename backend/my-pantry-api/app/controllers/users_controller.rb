class UsersController < ApplicationController

    def index
        @users = User.all
        render json: @users, include: :ingredients
    end

    def create
        #is there a way to get the children records (ingredients) for the user in one call here:
        @user = User.find_by name: params[:name]
        if @user.nil?
            @user = User.create(user_params)
        end

        pantry = Ingredient.all.select { |ingredient| ingredient.user_id == @user.id }

        render json: { user: @user, pantry: pantry }
    end

    def show
        @user = User.find(params[:id])
        render json: @user
    end

    private

    def user_params
        params.require(:user).permit(:name)
    end
end
