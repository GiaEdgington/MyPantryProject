document.addEventListener('DOMContentLoaded', function(){
    
    const userForm = document.querySelector('#userForm')
    const ingredientForm = document.querySelector('#ingredientForm')
    let addIngredient = true;
    let newUser = true;
    const key = "cd04f587acb64ddbacddf0334d460a6c";
    const ulOfRecipeTitles = document.querySelector('#list');
    const divOfRecipeTitles = document.querySelector('#list-panel');
    const divRecipeSummary = document.querySelector('#show-panel');
    const findRecipeButton = document.querySelector('#find-recipes');
    const ingredientUl = document.querySelector('#ingredientList');
    const hello = document.querySelector('.hello')
    const newNotepad = document.querySelector('.addIngredient')
    
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
        ingredientLi.innerHTML = `${ingredient.name}<br>
        <input class="checkbox" type="checkbox">`
        ingredientUl.append(ingredientLi);

        let checkedLi = ingredientLi.querySelector('.checkbox')
        

        checkedLi.addEventListener("change", function(){
            let deleteBtn = document.querySelector('.btnDelete')
            deleteBtn.addEventListener("click", function(){

                fetch('http://localhost:3000/ingredients/' + ingredient.id, {
                    method: "DELETE"
                }).then(response => response.json())
                .then(() => {
                    ingredientLi.remove()
                })
            })
        })
    }

   

    function findRecipes(userIngredients){
        let ingredArray = [];
        userIngredients.forEach((ingredient) => {
            ingredArray.push(ingredient.name)
        })

        getRecipesByIngredients(ingredArray.join(','));

    }


    // ---- DISPLAY WITH SUMMARY ---- //

    

    function getRecipesByIngredients(ingredients){
    
        fetch(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=49ae92052caa4eea82ab19c49b424204&ingredients=${ingredients}`)
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
