document.addEventListener('DOMContentLoaded', function () {

    const userForm = document.querySelector('#userForm')
    const ingredientForm = document.querySelector('#ingredientForm')
    let addIngredient = true;
    let newUser = true;
    let userIngredients=[];
    const key = "49ae92052caa4eea82ab19c49b424204";
    const ulOfRecipeTitles = document.querySelector('#list');
    const findRecipeButton = document.querySelector('#find-recipes');
    const ingredientUl = document.querySelector('#ingredientList');
    const hello = document.querySelector('.hello');
    const newNotepad = document.querySelector('.addIngredient');
    const deleteBtn = document.querySelector('.btnDelete');
    
    //create user
    userForm.addEventListener('submit', function(){
        event.preventDefault();
        let userName = userForm.querySelector('input').value
        fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accepts": "application/json"
            },
            body: JSON.stringify({
                name: userName
            })
        })
        .then(response => response.json())
        .then(data=> addToPantryMode(data))
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

        if ( addIngredient ){
            ingredientForm.style.display = "none"
        } else {
            ingredientForm.style.display = "block"
        }
        newNotepad.classList.add('addStyle');
        hello.innerText=`Hello, ${data.user.name}!
        Add ingredients to your pantry!`

        //Show Current Pantry
        userIngredients = data.pantry

        userIngredients.forEach((ingredient)=>{
            displayIngredient(ingredient)
        })
        const divButton = document.querySelector('#button-search')
        divButton.style.display = "block"

        //Search Recipes Button
        findRecipeButton.addEventListener('click', function(){
            findRecipes();
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
        .then(data => displayIngredient(data));
    })
}

    function displayIngredient(ingredient){
        userIngredients.push(ingredient);
        ingredientLi = document.createElement('li');
        ingredientLi.innerHTML = `${ingredient.name}<br>
        <input id="${ingredient.id}" class="checkbox" type="checkbox">`

        ingredientUl.append(ingredientLi);
    }

    deleteBtn.addEventListener("click", function(){
        let inputIngredients = document.getElementsByClassName('checkbox');
        for (let item of inputIngredients) {
            if(item.checked == true){

                fetch(`http://localhost:3000/ingredients/${item.id}`, {
                method: 'DELETE'
                }).then(response => {
                    item.parentElement.remove();
                });

            }
        };
    })

    function findRecipes(){
        //console.log(userIngredients);
        let ingredArray = [];
        userIngredients.forEach((ingredient) => {
            ingredArray.push(ingredient.name)
        })

        getRecipesByIngredients(ingredArray.join(','));
    }

    function getRecipesByIngredients(ingredients){
    
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${key}&ingredients=${ingredients}`)
        .then(response => response.json())
        .then(results => renderRecipeTitles(results))
    }

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
        
            fetch(`https://api.spoonacular.com/recipes/${id}/summary?apiKey=${key}`)
        .then(response => response.json())
        .then(details => renderDetails(details, li))
        })
    }

    function renderDetails(details, li){
        let summary = document.createElement('p')
        summary.innerHTML= `${details.summary}`
        li.append(summary)
    }
})
