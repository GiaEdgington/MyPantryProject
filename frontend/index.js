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
<<<<<<< HEAD

    userForm.addEventListener('submit', function () {
=======
    const ingredientUl = document.querySelector('#ingredientList');
    const hello = document.querySelector('.hello')
    const newNotepad = document.querySelector('.addIngredient')
    
    userForm.addEventListener('submit', function(){
>>>>>>> 4dc6f0f2b055f57f440dbee00e5d19cf1996eb3e

        event.preventDefault();

        let userName = userForm.querySelector('input').value

        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json"
            },
<<<<<<< HEAD
            body: JSON.stringify(
                {name: userName}
            )
        }).then(response => response.json()).then(user => addToPantry(user))
=======
            body: JSON.stringify({
                name: userName
            })
        })
        .then(response => response.json())
        .then(data=> addToPantryMode(data))
>>>>>>> 4dc6f0f2b055f57f440dbee00e5d19cf1996eb3e
    })

    function addToPantryMode(data){

        document.body.style.background= 'url("images/backgroundBlackOnly.jpg")'
        document.body.style.backgroundSize= "100%"
        document.body.style.backgroundRepeat= "repeat-y"

        //Set up Pantry Mode UI
        newUser = !newUser

        if ( newUser ){
            userForm.style.display = "block"
        } else {
            userForm.style.display = "none"
        }

        addIngredient = !addIngredient

<<<<<<< HEAD
    function addToPantry(user) {
        newUser = ! newUser
        if (newUser) {
            userForm.style.display = "block"
        } else {
            userForm.style.display = "none"
        }

        addIngredient = ! addIngredient
        if (addIngredient) {
=======
        if ( addIngredient ){
>>>>>>> 4dc6f0f2b055f57f440dbee00e5d19cf1996eb3e
            ingredientForm.style.display = "none"
        } else {
            ingredientForm.style.display = "block"
        }
<<<<<<< HEAD
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
=======

        hello.innerText=`Hello, ${data.user.name}!
        Add ingredients to your pantry!`

        newNotepad.style.backgroundColor="white"
        newNotepad.style.width="30%"
        newNotepad.style.height="400px;"
        newNotepad.style.margin="2em auto 0"
        newNotepad.style.paddingTop="1em"

        //Show Current Pantry
        let userIngredients = data.pantry

        userIngredients.forEach((ingredient)=>{
            displayIngredients(ingredient)
        })
        const divButton = document.querySelector('#button-search')
        divButton.style.display = "block"

        //Search Recipes Button
        findRecipeButton.addEventListener('click', function(){
            findRecipes(userIngredients)
        })

        //Add Ingredient Button
        ingredientForm.addEventListener('submit', function(){
        event.preventDefault()
        let ingredient = ingredientForm.querySelector('input').value

        fetch("http://localhost:3000/ingredients", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json"
            },
            body:JSON.stringify({
                name: ingredient,
                user_id: data.user.id
            })
        }).then(response => response.json())
        .then(data => displayIngredients(data));
    })
}

    
    function displayIngredients(ingredient){
        let ingredientLi = document.createElement('li');
        ingredientLi.innerText = `${ingredient.name}`
        ingredientUl.append(ingredientLi);
    }

    function findRecipes(userIngredients){
        let ingredArray = [];
        userIngredients.forEach((ingredient) => {
            ingredArray.push(ingredient.name)
>>>>>>> 4dc6f0f2b055f57f440dbee00e5d19cf1996eb3e
        })

<<<<<<< HEAD
=======
        getRecipesByIngredients(ingredArray.join(','));
>>>>>>> 4dc6f0f2b055f57f440dbee00e5d19cf1996eb3e

    // function findRecipes(allIngredients){
    // console.log(allIngredients)
    // allIngredients.forEach((ingredient) => {
    //     console.log(ingredient.name)
    // })

    // }

    // ---- DISPLAY WITH SUMMARY ---- //

<<<<<<< HEAD
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
=======
    

    function getRecipesByIngredients(ingredients){
    
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=49ae92052caa4eea82ab19c49b424204&ingredients=${ingredients}`)
        .then(response => response.json())
        .then(results => renderRecipeTitles(results))
    }
>>>>>>> 4dc6f0f2b055f57f440dbee00e5d19cf1996eb3e

    function renderRecipeTitles(results){
        results.forEach(result => {
            renderOneResult(result);

        })
    }

    function renderOneResult(result){
        let li = document.createElement("li");
        li.className = "recipe-card"
        li.innerHTML = result.title;
        li.dataset.id = result.id;

        li.innerHTML = `
            <h4>${result.title}</h4>
            <br>
            <img src=${result.image} data-id = ${result.id} />
        `
        ulOfRecipeTitles.append(li);

        li.addEventListener('click', function(){
            let id = event.target.dataset.id;
            //console.log(event.currentTarget)
        
            fetch(`https://api.spoonacular.com/recipes/${id}/summary?apiKey=49ae92052caa4eea82ab19c49b424204`)
        .then(response => response.json())
        .then(details => renderDetails(details, li))
        })
    }
    // function getSummarizeRecipe(id){
        
    // }

    function renderDetails(details, li){
        console.log(details);
        // divRecipeSummary.innerHTML =  `
        // <h2>${details.title}</h2>
        // <p>${details.summary}</p>
        // <button>Save</button
        // `
        let summary = document.createElement('p')
        summary.innerHTML= `${details.summary}`
        li.append(summary)
    }
})
