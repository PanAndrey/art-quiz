import image from "./images/lazy.png";

// const createImage = (src) => new Promise((res, rej) => {
//   const img = new Image();
//   img.onload = () => res(img);
//   img.onerror = rej;
//   img.src = src;
// });

// async function render() {
//   const subHeader = document.createElement('h2');
//   subHeader.innerHTML = 'This elements was created by js';
//   const myImage = await createImage(image);
//   document.body.appendChild(subHeader);
//   document.body.appendChild(myImage);
// }

// render();

const toSettings = document.querySelector(".home__btn");
const home = document.querySelector(".home");
const settings = document.querySelector(".settings");
const saveBtn = document.querySelector(".save__btn");
const logo = document.querySelector(".logo");
const categories = document.querySelector(".categories");
const artistQz = document.querySelector(".home__art-qz");

const categHomeBtn = document.querySelector(".categories__home ");

logo.addEventListener("click", () => {
  let className = "." + window.location.hash.slice(1);
  let shownSection = document.querySelector(className);
  changePage(shownSection, home);
  window.location.hash = "home";
});
toSettings.addEventListener("click", () => {
  window.location.hash = "settings";
  changePage(home, settings);
});
saveBtn.addEventListener("click", () => {
  window.location.hash = "home";
  changePage(settings, home);
});
categHomeBtn.addEventListener("click", () => {
  window.location.hash = "home";
  changePage(categories, home);
});
artistQz.addEventListener("click", () => {
  window.location.hash = "categories";
  changePage(home, categories);
});
// window.addEventListener("hashchange", (shownSection, hidenSection) => {});
function changePage(shownSection, hidenSection) {
  shownSection.classList.remove("active");
  hidenSection.classList.add("active");
}

const categWrap = document.querySelector(".categories__main");

let categoriesArr = [
  "portrate",
  "landscape",
  "slill life",
  "impressionism",
  "expressionism",
  "avant-garde",
  "renaissance",
  "surrealism",
  "kitsh",
  "minimalism",
];

for (let i = 0; i < categoriesArr.length; i++) {
  let card = document.createElement("div");
  card.classList.add("categories__card");
  card.innerHTML = `
                        <h3 class="card__title">${i + 1}</h3>
                        <div class="card__text">${categoriesArr[i]}</div>
                        <img src="images/categories/category-${
                          i + 1
                        }-color.png" alt="img not found" class="card__img" />
                    
                    `;
  categWrap.append(card);
}
