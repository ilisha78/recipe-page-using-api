const inp= document.getElementById("inp");
const search= document.getElementById("search");

async function func() {
    const recipeName = inp.value;
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${recipeName}`;

    try {
        const fetchUrl= await fetch(url);
        const data= await fetchUrl.json()
        console.log(data);

        if (data.meals) {
            const meal = data.meals[0];
            document.getElementById("red").innerHTML = "Food Name: " + meal.strMeal;
            document.getElementById("area").innerHTML = "Food Area: " + meal.strArea;
            document.getElementById("category").innerHTML = "Category: " + meal.strCategory;
            document.getElementById("steps").innerHTML =  meal.strInstructions;
            let img = document.getElementById("img");
            img.src = meal.strMealThumb;
            document.getElementById("ingre").innerHTML = "";
            const ingredentList= document.getElementById("ingre");
            for(let i=0; i<=50; i++){
                const ingredient = meal[`strIngredient${i}`];
                const measure = meal[`strMeasure${i}`];
                if (ingredient){
                    const itemList= document.createElement("li");
                    itemList.textContent=` ${ingredient} - ${measure}`;
                    ingredentList.appendChild(itemList);
                }
            }
        } 
        else {
            alert('Recipe not found!');
        }
    } catch (error) {
        console.log("Error fetching data", error)
    }

    let show= document.getElementById("hide")
    show.style.display="block"
}
search.addEventListener('click', func )