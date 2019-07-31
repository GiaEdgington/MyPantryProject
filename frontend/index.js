document.addEventListener('DOMContentLoaded', function(){

    const userForm = document.querySelector('#userForm')
    const ingredientForm = document.querySelector('#ingredientForm')
    let addIngredient = true;
    let newUser = true;

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
        .then(user => addToPantry(user))
    })

        function addToPantry(user){
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
                user_id: user.id
            })
        }).then(response => response.json())
        .then(ingredient => displayIngredients(ingredient))
            
        })
    }

    function displayIngredients(ingredient){
        let ingUl = document.querySelector('#ing-list');
        let ingredientLi = document.createElement('li');
        ingredientLi.innerText = `${ingredient.name}`
        ingUl.append(ingredientLi);
        return ingUl
    }
})
