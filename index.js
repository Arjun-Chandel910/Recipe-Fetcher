let form = document.querySelector("form");
let srcBtn = document.querySelector("srcBtn");
let inp = document.querySelector("input");
let resDiv = document.querySelector(".res");
let beforeRes = document.querySelector(".beforeRes");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let recipies = await getRecipe(inp.value);
  for (r of recipies.data.meals) {
    console.log(r.strMeal);
    try {
      beforeRes.style.display = "none";
      // card
      let card = document.createElement("div");
      card.classList.add("cards");

      // btn
      let details = document.createElement("button");
      details.innerText = "details";

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
