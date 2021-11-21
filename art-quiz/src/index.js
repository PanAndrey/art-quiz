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

import { images } from "./images/images";

let authorsList = [];
let picNamesList = [];
images.forEach((element) => {
  authorsList.push(element.author);
  picNamesList.push(element.name);
});

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
function changePage(shownSection, hidenSection) {
  shownSection.classList.remove("active");
  hidenSection.classList.add("active");
}

const categWrap = document.querySelector(".categories__main");

let categoriesArr = [
  "portrait",
  "landscape",
  "still life",
  "impressionism",
  "expressionism",
  "avant-carde",
  "renaissance",
  "surrealism",
  "kitsh",
  "minimalism",
];

for (let i = 0; i < categoriesArr.length; i++) {
  let card = document.createElement("div");
  card.classList.add("categories__card");
  card.addEventListener("click", () => {
    window.location.hash = `artistsQz-${i + 1}`;
    document.querySelector(".categories").classList.remove("active");
    showQuestionsAuthors();
  });

  card.innerHTML = `
                        <h3 class="card__title">${i + 1}</h3>
                        <div class="card__text">${categoriesArr[i]}</div>
                        <img src="images/categories/category-${
                          i + 1
                        }-color.png" alt="img not found" class="card__img" />
                    
                    `;
  categWrap.append(card);
}

// фукция для отображения карточки вопроса

function showQuestionsAuthors() {
  showQuestionProgress();
  document.querySelector(".question").classList.remove("hidden");
  const questionWrapper = document.querySelector(".question__main");
  for (let i = 0; i < 10; i++) {
    let questionCard = document.createElement("div");
    questionCard.classList.add("question__card");
    if (i != 0) {
      questionCard.classList.add("hidden");
    }
    questionCard.innerHTML = `
    <h3 class="question__title">Кто автор этой картины?</h3>
  <img src="./images/question-images/${images[i].imageNum}.jpg" alt="img not found">
  <div class="answer__wrapper">
    <div class="answers__top">
      <button class="answer answer-number-${i}"></button>
      <button class="answer answer-number-${i}"></button>
    </div>
    <div class="answer__line"></div>
    <div>
      <button class="answer answer-number-${i}"></button>
      <button class="answer answer-number-${i}"></button>
    </div>
  </div>
  `;
    questionWrapper.append(questionCard);

    let answers = document.querySelectorAll(`.answer-number-${i}`);

    // добавление неправильных ответов
    let randomAnswers = getRandomSet(0, 240, 4);
    let answerNumber = 0;

    answers.forEach((answer) => {
      answer.innerHTML = authorsList[randomAnswers[answerNumber]];
      answer.classList.add("wrong");
      answerNumber++;
    });

    // случайное определение правильного ответа
    let rightAnswer = getRandomInt(4);
    answers[rightAnswer].innerHTML = images[i].author;
    answers[rightAnswer].classList.remove("wrong");
    answers[rightAnswer].classList.add("right");
  }

  const questionsArr = document.querySelectorAll(".question__card");
  const answerBtns = document.querySelectorAll(".answer");
  // отображение и скрытие карточек с вопросами
  let questionNumber = 0;
  answerBtns.forEach((answerBtn) => {
    answerBtn.addEventListener("click", () => {
      questionsArr[questionNumber].classList.add("hidden");
      questionsArr[questionNumber + 1].classList.remove("hidden");
      questionNumber++;
    });
  });

  // проверка ответа
  const rightAnswers = document.querySelectorAll(".right");
  const wrongAnswers = document.querySelectorAll(".wrong");
  const dots = document.querySelectorAll(".dot");

  let answerWindow = document.createElement("div");
  answerWindow.classList.add("answer__window");

  let dotNumber = 0;
  for (let i = 0; i < rightAnswers.length; i++) {
    rightAnswers[i].addEventListener("click", () => {
      dots[dotNumber].classList.add("dot-right");
      dotNumber++;

      document.querySelector(".question__wrapper").append(answerWindow);
      answerWindow.innerHTML = `<h1>aaaaaaa</h1>`;
    });
  }
  wrongAnswers.forEach((element) => {
    element.addEventListener("click", () => {
      dots[dotNumber].classList.add("dot-wrong");
      dotNumber++;
    });
  });

  function showQuestionProgress() {
    const progressContainer = document.querySelector(".question__progress");
    console.log(progressContainer);
    for (let i = 0; i < 10; i++) {
      let progressDot = document.createElement("div");
      progressDot.classList.add(`progress-dot-${i}`);
      progressDot.classList.add(`dot`);
      progressContainer.append(progressDot);
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomSet(lo, hi, n) {
  let res = new Set();
  while (res.size < n) res.add(Math.floor(Math.random() * (hi - lo + 1)) + lo);
  return [...res];
}
