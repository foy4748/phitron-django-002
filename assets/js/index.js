// State Variables
let addedItems = 0;
let itemLimit = 3;
let debouncer = null;
// ---------------
// Containers
const categoryContainer = document.getElementById("category-container");
const dishCardContainer = document.getElementById("dish-card-container");
const cartContainer = document.getElementById("cart-container");
const modalTitleContainer = document.getElementById("exampleModalLongLabel");
const modalContainer = document.getElementById("modal-container");
const searchField = document.getElementById("search-field");

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

function fetchDishDetails(id) {
  let url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  customFetch(url, renderDetailsModal, "meals");
}

function fetchSearchedDishes(keyword) {
  let url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;
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

    // Added Event Listener for Cart Item
    const cardCartButton = newDiv.querySelector(".cart-btn");
    cardCartButton.addEventListener("click", () => {
      if (addedItems < itemLimit) {
        cartContainer.innerHTML += CartItem(d.strMealThumb, d.strMeal);
        cardCartButton.setAttribute("disabled", true);
        addedItems++;
      } else {
        alert(`Already added ${itemLimit} items`);
      }
    });

    // Added Event Listener for Details Modal
    const detailsButton = newDiv.querySelector(".details-btn");
    detailsButton.addEventListener("click", () => {
      fetchDishDetails(d.idMeal);
    });

    dishCardContainer.appendChild(newDiv);
  });
}

function renderDetailsModal({ result }) {
  console.log(result);
  let d = null;
  if (result) {
    d = result[0];
  }
  modalTitleContainer.innerText = d?.strMeal;
  modalContainer.innerHTML = ModalBody(
    d?.strMealThumb,
    d?.strMeal,
    d?.strInstructions,
    d?.strTags
  );
  const modalTrigger = document.querySelector(".modal-trigger");
  modalTrigger.click();
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
  class="rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark h-full flex flex-col justify-between"
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
  <div class="p-2 text-surface">
	<h5 class="mb-2 font-medium leading-tight">${
    dishName.length >= 18 ? `${dishName.slice(0, 18) + "..."}` : dishName
  }</h5>
	<p class="mb-4 text-base"></p>
	<div class="flex items-center space-x-1">
	<button
	  type="button"
	  class="inline-block rounded bg-blue-500 text-white px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 cart-btn"
	  data-twe-ripple-init
	  data-twe-ripple-color="light"
	>
	  Add to Cart
	</button>
	<button
	  type="button"
	  class="inline-block rounded bg-blue-500 text-white px-4 pb-[5px] pt-[6px] text-xs font-medium uppercase leading-normal shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 details-btn"
	  data-twe-ripple-init
	  data-twe-ripple-color="light"
	>
	Details
	</button>
	<span
		class="modal-trigger"
		data-twe-toggle="modal"
		data-twe-target="#exampleModalLong"
	></span>

	</div>
  </div>
</div>
<!-- END of single card -->
`;

const CartItem = (image, dishName) => `
<section class="grid grid-cols-12">
  <figure class="col-span-4">
	<img
	  class="w-full h-full object-cover"
	  src="${image}"
	  alt=""
	/>
  </figure>
  <div class="col-span-8 ps-4 flex items-center">
	<div>
	<p class="font-bold">
	${dishName.length >= 18 ? `${dishName.slice(0, 18) + "..."}` : dishName}
	</p>
	  <p>Price : $${(Math.random() * (99 - 10) + 10).toFixed(2)}</p>
	</div>
  </div>
</section>

`;

const ModalBody = (image, dishName, description, tags) => `
	<figure>
		<img src="${image}" alt="${dishName} image" />
	</figure>
	<article>
	${
    tags
      ? `
	<p class="my-4"><span class="font-bold">Tags</span> : ${tags
    ?.split(",")
    ?.map(
      (t) => `<span
  class="inline-block whitespace-nowrap rounded-[0.27rem] bg-slate-200 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.75em] font-bold leading-none text-primary-700">
  ${t}
</span>`
    )
    .join("")}</p>

		`
      : ``
  }
	<p class="font-bold mt-4 mb-2">Description</p>
	<p>${description}</p>
	</article>
`;

// Main
fetchCategories();

// Event Listners
searchField.addEventListener("keyup", function (e) {
  let inputKeywords = e.target.value;
  if (debouncer) clearTimeout(debouncer);
  debouncer = setTimeout(() => {
    fetchSearchedDishes(inputKeywords);
  }, 800);
});
