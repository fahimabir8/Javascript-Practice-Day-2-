document.getElementById("btn").addEventListener("click", function () {
  const query = document.getElementById("search").value;
  if (query) {
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${query}`)
      .then((response) => response.json())
      .then((data) => {
        FoodItems(data);
      });
  } else {
    document.getElementById("food-container").innerHTML = "<h1>Enter a valid letter</h1>" ;
    document.getElementById("detail-view").innerHTML = '';
  }
});

const FoodItems = (foods) => {
  const foodContainer = document.getElementById("food-container");
  foodContainer.innerHTML = "";
  if (foods.meals) {
    foods.meals.forEach((food) => {
      console.log(food);
      const div = document.createElement("div");
      div.classList.add("card");
      div.innerHTML = `
            <img src="${food.strMealThumb}" class="card-img" alt="${food.strMeal}">
            <h4>${food.strMeal}</h4>
            `;
          document.getElementById("detail-view").innerHTML = '';
      div.addEventListener("click", () => detailCard(food));
      foodContainer.appendChild(div);
    });
  } else {
    const nothing = document.createElement("div");
    nothing.classList.add("error");
    nothing.innerHTML = "NOT FOUND";
    foodContainer.appendChild(nothing);
  }
};

const detailCard = (food) => {
  const detailView = document.getElementById("detail-view");
  document.getElementById("detail-view").innerHTML = '';
  const div = document.createElement("div");
  div.classList.add("detail-card")
  div.innerHTML = `
    <img src="${food.strMealThumb}" class="detail-card-img" alt="${food.strMeal}">
    <h4 class="name">${food.strMeal}</h4>
    <h5 class="name"> Ingredients </h5> 
  `
  const ingredientList = document.createElement("ul");

  for (let i = 1; i <= 20; i++) {
      if (food[`strIngredient${i}`]) {
          const ingredientItem = document.createElement("li");
          ingredientItem.innerHTML = `<p>${food[`strIngredient${i}`]} - ${food[`strMeasure${i}`]}</p>`;
          ingredientList.appendChild(ingredientItem);
      }
  }
  detailView.appendChild(div);
  div.appendChild(ingredientList);
  detailView.scrollIntoView();
};
