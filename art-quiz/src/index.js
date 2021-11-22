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

import { imagesMain } from "./images/images";

let authorsList = [];
let picNamesList = [];
imagesMain.forEach((element) => {
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
const picQz = document.querySelector(".home__pic-qz");

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
picQz.addEventListener("click", () => {
  window.location.hash = "categories-pic";
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
// создание каталога вопросов
let authorsQuizQuestions = [];
let picturesQiuzQuestion = [];
for (let i = 0; i < 100; i = i + 10) {
  authorsQuizQuestions.push(imagesMain.slice(i, i + 10));
  picturesQiuzQuestion.push(imagesMain.slice(i + 100, i + 110));
}
for (let i = 0; i < categoriesArr.length; i++) {
  let card = document.createElement("div");
  card.classList.add("categories__card");
  card.addEventListener("click", () => {
    // window.location.hash = `artistsQz-${i + 1}`;
    document.querySelector(".categories").classList.remove("active");
    if (window.location.hash === "#categories") {
      showQuestionsAuthors(authorsQuizQuestions[i]);
    } else {
      showQuestionsPictures(picturesQiuzQuestion[i]);
    }
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

function showQuestionsAuthors(images) {
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
    <div class="answer__window hidden answer__window-${i}">
      <img class="result__correct-${i} result__icon" src="./images/correct-answer.png" alt="img not found" />
      <img class="result__wrong-${i} result__icon"  src="./images/wrong-answer.png" alt="img not found" />
      <img class="result__img" src="./images/question-images/${images[i].imageNum}.jpg" alt="img not found">
      <div class="result__img-name">${images[i].name}</div>
      <div class="result__name">${images[i].author}</div>
      <div class="result__date">${images[i].year}</div>
      <button class="btn answer__window-btn">next</button> 
    </div>
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

    // скрыть окно answer__window
    document
      .querySelector(`.answer__window-${i}`)
      .addEventListener("click", () => {
        document.querySelector(`.answer__window-${i}`).classList.add("hidden");
      });

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
  const nextBtns = document.querySelectorAll(".answer__window");
  const mainResults = document.querySelector(".quiz-result");

  // отображение и скрытие карточек с вопросами
  let questionNumber = 0;
  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", () => {
      if (questionNumber === 2) {
        document.querySelector(".question").classList.add("hidden");
        mainResults.classList.remove("hidden");
        let correctAnswers = document.querySelectorAll(".dot-right").length;
        document.querySelector(
          ".quiz-result__main"
        ).innerHTML = `<div class="correct-answers">${correctAnswers}/10</div>`;
        document
          .querySelector(".quiz-result__btn")
          .addEventListener("click", () => {
            home.classList.add("active");
            document.querySelector(".quiz-result").classList.add("hidden");
          });
        document.querySelector(".question__progress").innerHTML = " ";
        questionNumber = 0;
      } else {
        questionsArr[questionNumber].classList.add("hidden");
        questionsArr[questionNumber + 1].classList.remove("hidden");
        questionNumber++;
      }
    });
  });

  // проверка ответа
  const rightAnswers = document.querySelectorAll(".right");
  const wrongAnswers = document.querySelectorAll(".wrong");
  const dots = document.querySelectorAll(".dot");
  const answerWindows = document.querySelectorAll(".answer__window");

  let dotNumber = 0;
  rightAnswers.forEach((element) => {
    if (dotNumber > 10) dotNumber = 0;
    element.addEventListener("click", () => {
      document
        .querySelector(`.result__wrong-${dotNumber}`)
        .classList.add("hidden");
      answerWindows[dotNumber].classList.remove("hidden");
      dots[dotNumber].classList.add("dot-right");
      dotNumber++;
    });
  });
  wrongAnswers.forEach((element) => {
    if (dotNumber > 10) dotNumber = 0;
    element.addEventListener("click", () => {
      document
        .querySelector(`.result__correct-${dotNumber}`)
        .classList.add("hidden");
      answerWindows[dotNumber].classList.remove("hidden");
      dots[dotNumber].classList.add("dot-wrong");
      dotNumber++;
    });
  });

  function showQuestionProgress() {
    const progressContainer = document.querySelector(".question__progress");
    for (let i = 0; i < 10; i++) {
      let progressDot = document.createElement("div");
      progressDot.classList.add(`progress-dot-${i}`);
      progressDot.classList.add(`dot`);
      progressContainer.append(progressDot);
    }
  }
}

function showQuestionsPictures(images) {
  showQuestionProgress();
  document.querySelector(".question").classList.remove("hidden");
  const questionWrapper = document.querySelector(".question__main");
  for (let i = 0; i < 10; i++) {
    let questionCard = document.createElement("div");
    questionCard.classList.add("question__card");
    if (i != 0) {
      questionCard.classList.add("hidden");
    }
    let randomPics = getRandomSet(0, 240, 4);
    questionCard.innerHTML = `
    <div class="answer__window hidden answer__window-${i}">
      <img class="result__correct-${i} result__icon" src="./images/correct-answer.png" alt="img not found" />
      <img class="result__wrong-${i} result__icon"  src="./images/wrong-answer.png" alt="img not found" />
      <img class="result__img" src="./images/question-images/${
        images[i].imageNum
      }.jpg" alt="img not found">
      <div class="result__img-name">${images[i].name}</div>
      <div class="result__name">${images[i].author}</div>
      <div class="result__date">${images[i].year}</div>
      <button class="btn answer__window-btn">next</button> 
    </div>
    <h3 class="question__title">${
      images[i].author
    } является автором какой картины?</h3>
    <div class="picture-wrapper">
      <img class="pic-qz-img-${i}" src="./images/question-images/${
      imagesMain[randomPics[0]].imageNum
    }.jpg" alt="img not found">
      <img class="pic-qz-img-${i}" src="./images/question-images/${
      imagesMain[randomPics[1]].imageNum
    }.jpg" alt="img not found">
      <img class="pic-qz-img-${i}" src="./images/question-images/${
      imagesMain[randomPics[2]].imageNum
    }.jpg" alt="img not found">
      <img class="pic-qz-img-${i}" src="./images/question-images/${
      imagesMain[randomPics[3]].imageNum
    }.jpg" alt="img not found">
    </div>
    <div class="answer__wrapper">
      <div class="answers__top">
        <button class="answer answer-number-${i}">a</button>
        <button class="answer answer-number-${i}">b</button>
      </div>
      <div class="answer__line"></div>
      <div>
        <button class="answer answer-number-${i}">c</button>
        <button class="answer answer-number-${i}">d</button>
      </div>
    </div>
    `;

    questionWrapper.append(questionCard);

    const picQzImgs = document.querySelectorAll(`.pic-qz-img-${i}`);

    let rightAnswerNumber = getRandomInt(4);

    picQzImgs[
      rightAnswerNumber
    ].src = `./images/question-images/${images[i].imageNum}.jpg`;

    // скрыть окно answer__window
    document
      .querySelector(`.answer__window-${i}`)
      .addEventListener("click", () => {
        document.querySelector(`.answer__window-${i}`).classList.add("hidden");
      });

    let answers = document.querySelectorAll(`.answer-number-${i}`);

    // добавление неправильных ответов
    let randomAnswers = getRandomSet(0, 240, 4);
    let answerNumber = 0;

    answers.forEach((answer) => {
      answer.classList.add("wrong");
      answerNumber++;
    });

    // случайное определение правильного ответа
    answers[rightAnswerNumber].classList.remove("wrong");
    answers[rightAnswerNumber].classList.add("right");
  }

  const questionsArr = document.querySelectorAll(".question__card");
  const nextBtns = document.querySelectorAll(".answer__window");
  const mainResults = document.querySelector(".quiz-result");

  // отображение и скрытие карточек с вопросами
  let questionNumber = 0;
  nextBtns.forEach((nextBtn) => {
    nextBtn.addEventListener("click", () => {
      if (questionNumber === 2) {
        document.querySelector(".question").classList.add("hidden");
        mainResults.classList.remove("hidden");
        let correctAnswers = document.querySelectorAll(".dot-right").length;
        document.querySelector(
          ".quiz-result__main"
        ).innerHTML = `<div class="correct-answers">${correctAnswers}/10</div>`;
        document
          .querySelector(".quiz-result__btn")
          .addEventListener("click", () => {
            home.classList.add("active");
            document.querySelector(".quiz-result").classList.add("hidden");
          });
      } else {
        questionsArr[questionNumber].classList.add("hidden");
        questionsArr[questionNumber + 1].classList.remove("hidden");
        questionNumber++;
      }
    });
  });

  // проверка ответа
  const rightAnswers = document.querySelectorAll(".right");
  const wrongAnswers = document.querySelectorAll(".wrong");
  const dots = document.querySelectorAll(".dot");
  const answerWindows = document.querySelectorAll(".answer__window");

  let dotNumber = 0;
  rightAnswers.forEach((element) => {
    element.addEventListener("click", () => {
      document
        .querySelector(`.result__wrong-${dotNumber}`)
        .classList.add("hidden");
      answerWindows[dotNumber].classList.remove("hidden");
      dots[dotNumber].classList.add("dot-right");
      dotNumber++;
    });
  });
  wrongAnswers.forEach((element) => {
    element.addEventListener("click", () => {
      document
        .querySelector(`.result__correct-${dotNumber}`)
        .classList.add("hidden");
      answerWindows[dotNumber].classList.remove("hidden");
      dots[dotNumber].classList.add("dot-wrong");
      dotNumber++;
    });
  });

  function showQuestionProgress() {
    const progressContainer = document.querySelector(".question__progress");
    progressContainer.innerHTML = "";
    for (let i = 0; i < 10; i++) {
      let progressDot = document.createElement("div");
      progressDot.classList.add(`progress-dot-${i}`);
      progressDot.classList.add(`dot`);
      progressContainer.append(progressDot);
    }
  }
}
// функция возвращает рандомное число в заданном диапазоне
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// функция возвращает указанное количество рандомных неповторяющихся чисел  в заданном диапазоне
function getRandomSet(lo, hi, n) {
  let res = new Set();
  while (res.size < n) res.add(Math.floor(Math.random() * (hi - lo + 1)) + lo);
  return [...res];
}
