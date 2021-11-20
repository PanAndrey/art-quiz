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

toSettings.addEventListener("click", () => {
  changePage(home, settings);
});
saveBtn.addEventListener("click", () => {
  changePage(settings, home);
});

window.addEventListener("hashchange", (shownSection, hidenSection) => {});
function changePage(shownSection, hidenSection) {
  shownSection.classList.remove("active");
  hidenSection.classList.add("active");
}
