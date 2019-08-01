document.addEventListener('DOMContentLoaded', function () {

    const userForm = document.querySelector('#userForm')
    const ingredientForm = document.querySelector('#ingredientForm')
    let addIngredient = true;
    let newUser = true;
    const key = "cd04f587acb64ddbacddf0334d460a6c";
    const ulOfRecipeTitles = document.querySelector('#list');
    const divOfRecipeTitles = document.querySelector('#list-panel');
    const divRecipeSummary = document.querySelector('#show-panel');
    const findRecipeButton = document.querySelector('#find-recipes');

    userForm.addEventListener('submit', function () {

        event.preventDefault();

        let userName = userForm.querySelector('input').value


        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify(
                {name: userName}
            )
        }).then(response => response.json()).then(user => addToPantry(user))
    })


    function addToPantry(user) {
        newUser = ! newUser
        if (newUser) {
            userForm.style.display = "block"
        } else {
            userForm.style.display = "none"
        }

        addIngredient = ! addIngredient
        if (addIngredient) {
            ingredientForm.style.display = "none"
        } else {
            ingredientForm.style.display = "block"
        }
        ingredientForm.addEventListener('submit', function () {
            event.preventDefault()
            let ingredient = ingredientForm.querySelector('input').value

            fetch("http://localhost:3000/ingredients", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                    "Accepts": "application/json"
                },
                body: JSON.stringify(
                    {name: ingredient, user_id: user.id}
                )
            }).then(response => response.json()).then(data => displayIngredients(data, user));
        })
    }


    function displayIngredients(ingredient) {

        let ingUl = document.querySelector('#ing-list');
        let ingredientLi = document.createElement('li');
        ingredientLi.innerText = `${
            ingredient.ingredient.name
        }` ingUl.append(ingredientLi);

        findRecipeButton.addEventListener('click', function () {
            let myIngredients = `${
                user.ingredients.name
            }` console.log(myIngredients);
            // let allIngredients = ingredient.all
            // findRecipes(allIngredients)
        })
        return ingUl
    }


    // function findRecipes(allIngredients){
    // console.log(allIngredients)
    // allIngredients.forEach((ingredient) => {
    //     console.log(ingredient.name)
    // })

    // }


    //     ulOfRecipeTitles.addEventListener('click', function(event){
    //         let id = event.target.dataset.id;
    //         console.log(event.currentTarget)

    //         getSummarizeRecipe(id);
    //     })

    // function getSummarizeRecipe(id){
    //     fetch(`https://api.spoonacular.com/recipes/${id}/summary?apiKey=${key}`)
    //     .then(response => response.json())
    //     .then(details => renderDetails(details))
    // }

    // function renderDetails(details){
    //     console.log(details);

    //     divRecipeSummary.innerHTML =  `
    //     <h2>${details.title}</h2>
    //     <p>${details.summary}</p>
    //     <button>Save</button
    //     `
    // }

    // function getRecipesByIngredients(ingredients){

    //     fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${key}&ingredients=${ingredients}`)
    //     .then(response => response.json())
    //     .then(results => renderRecipeTitles(results))
    // }

    // function renderRecipeTitles(results){
    //     results.forEach(result => {
    //         console.log(result.title);
    //         renderOneResult(result);

    //     })
    // }

    // function renderOneResult(result){
    //     console.log(result)
    //     let li = document.createElement("li");
    //     li.innerHTML = result.title;
    //     li.dataset.id = result.id;

    //     li.innerHTML = `
    //         <h3>${result.title}</h3>
    //         <br>
    //         <img src=${result.image} data-id = ${result.id}>
    //     `
    //     ulOfRecipeTitles.append(li);
    // }

})
