let form = document.querySelector("form");
let srcBtn = document.querySelector("srcBtn");
let inp = document.querySelector("input");
let body = document.querySelector("body");

// divs
let resDiv = document.querySelector(".res");
let beforeRes = document.querySelector(".beforeRes");
let reciCard = document.querySelector(".reciCard");

// Main CODE
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resDiv.innerText = "";

  let recipies = await getRecipe(inp.value);
  for (r of recipies.data.meals) {
    console.log(r);
    try {
      beforeRes.style.display = "none";
      // card
      let card = document.createElement("div");
      card.classList.add("cards");

      // Details Button
      let details = document.createElement("button");
      details.innerText = "details";

      // recipies
      details.addEventListener(
        "click",
        ((recipeData) => {
          return () => {
            resDiv.style.opacity = 0.3;
            reciCard.style.zIndex = 2;
            reciCard.innerHTML = ""; // Clear previous details

            let ul = document.createElement("ul");
            for (let i = 1; i <= 11; i++) {
              if (
                recipeData[`strIngredient${i}`] &&
                recipeData[`strMeasure${i}`]
              ) {
                let l = document.createElement("li");
                l.innerText = `${recipeData[`strIngredient${i}`]} : ${
                  recipeData[`strMeasure${i}`]
                }`;
                ul.appendChild(l);
              }
            }
            let i = document.createElement("i");
            i.classList.add("fa-sharp");
            i.classList.add("fa-regular");
            i.classList.add("fa-circle-xmark");
            i.classList.add("cross");

            reciCard.appendChild(i);
            i;

            reciCard.appendChild(ul);
            reciCard.classList.remove("dis");
            i.addEventListener("click", () => {
              reciCard.classList.add("dis");
              resDiv.style.opacity = 1;
              reciCard.style.zIndex = 1;
            });
            reciCard.classList.add("recipeCard");
          };
        })(r)
      );
      // recipe list ends

      // img
      let img = document.createElement("img");
      img.classList.add("img");
      img.setAttribute("src", `${r.strMealThumb}`);
      let p = document.createElement("p");

      p.innerText = `${r.strMeal}`;
      card.appendChild(p);
      card.appendChild(img);
      card.appendChild(details);
      resDiv.appendChild(card);
    } catch (err) {
      console.log(err);
    }
  }
});

async function getRecipe(val) {
  let data = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${val}`
  );
  return data;
}
