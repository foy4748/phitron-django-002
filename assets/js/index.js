// State Variables

// ---------------
// Containers
const categoryContainer = document.getElementById("category-container");
const dishCardContainer = document.getElementById("dish-card-container");

// ---------------
function customFetch(url, renderFn, keyname = null) {
  fetch(url)
    .then((res) => res.json())
    .then((d) => {
      let result = keyname ? d[keyname] : d;
      renderFn({ result, error: null });
    })
    .catch((error) => {
      renderFn({ result: null, error });
    });
}

// Fetch functions
function fetchCategories() {
  let url = "https://www.themealdb.com/api/json/v1/1/categories.php";
  customFetch(url, renderCategories, "categories");
}

function fetchCatgoryData(category) {
  let url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
  customFetch(url, renderCategoryData, "meals");
}
// ---------------

// Render functions
function renderCategories({ result: categoriesArr }) {
  categoryContainer.innerHTML = "";
  categoriesArr.slice(0, 6).forEach((catg, idx) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = NavItem(catg.strCategory, catg.strCategoryThumb);

    // Category Click Event Listener
    newDiv.addEventListener("click", () => {
      fetchCatgoryData(catg.strCategory);
    });
    categoryContainer.appendChild(newDiv);
    if (idx == 0) newDiv.click();
  });
}

function renderCategoryData({ result: data }) {
  dishCardContainer.innerHTML = "";
  data.forEach((d) => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML = DishCard(d.strMealThumb, d.strMeal);
    newDiv.classList.add("col-span-3");
    dishCardContainer.appendChild(newDiv);
  });
}
// ---------------

// UI parts
const NavItem = (category, categoryImg) => `
<!-- Single Nav Item -->
<li class="mb-4 ps-2 lg:mb-0 lg:pe-1 lg:ps-0" data-twe-nav-item-ref>
	<div class="flex p-0 text-black/60 transition duration-200 hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none dark:text-white/60 dark:hover:text-white/80 dark:focus:text-white/80 dark:active:text-white/80 lg:px-2" data-twe-nav-link-ref>
		<img class="w-[70px] h-[30px] object-cover" src="${categoryImg}" alt="${category} category image" />
		<button>${category}</button
	  >
	</div>
</li>
`;

const DishCard = (dishImg, dishName) => `
<!-- Single Card -->
<div
  class="block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark"
>
  <div
	class="relative overflow-hidden bg-cover bg-no-repeat"
	data-twe-ripple-init
	data-twe-ripple-color="light"
  >
	<img
	  class="rounded-t-lg w-full"
	  src="${dishImg}"
	  alt=""
	/>
	<a href="#!">
	  <div
		class="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-[hsla(0,0%,98%,0.15)] bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100"
	  ></div>
	</a>
  </div>
  <div class="p-6 text-surface">
	<h5 class="mb-2 text-xl font-medium leading-tight">${dishName}</h5>
	<p class="mb-4 text-base"></p>
	<button
	  type="button"
	  class="inline-block rounded bg-blue-500 text-white px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2"
	  data-twe-ripple-init
	  data-twe-ripple-color="light"
	>
	  Button
	</button>
  </div>
</div>
<!-- END of single card -->
`;

// Main
fetchCategories();
