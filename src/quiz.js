const quizData = [
  {
    question: "What is the name of the Lannister ancestral seat?",
    options: ["Storm's End", "Highgarden", "Casterly Rock", "Riverrun"],
    answer: "Casterly Rock",
  },
  {
    question:
      "Who was the Lord Commander of the Night's Watch before Jon Snow?",
    options: [
      "Maester Aemon",
      "Qhorin Halfhand",
      "Alliser Thorne",
      "Jeor Mormont",
    ],
    answer: "Jeor Mormont",
  },
  {
    question:
      "What is the name of the temple in Braavos where the Faceless Men train?",
    options: [
      "The Citadel",
      "The Iron Bank",
      "The Red Keep",
      "The House of Black and White",
    ],
    answer: "The House of Black and White",
  },
  // {
  //   question:
  //     "At the Red Wedding, which two major characters were killed along with their bannermen?",
  //   options: [
  //     "Ned Stark and Jon Snow",
  //     "Robb Stark and Catelyn Stark",
  //     "Tyrion Lannister and Jaime Lannister",
  //     "Daenerys Targaryen and Khal Drogo",
  //   ],
  //   answer: "Robb Stark and Catelyn Stark",
  // },
  // {
  //   question: "What are the names of Daenerys Targaryen's three dragons?",
  //   options: [
  //     "Rhaegal, Viserion, Syrax",
  //     "Drogon, Meraxes, Balerion",
  //     "Balerion, Vhagar, Meraxes",
  //     "Drogon, Rhaegal, Viserion",
  //   ],
  //   answer: "Drogon, Rhaegal, Viserion",
  // },
  // {
  //   question:
  //     "What is Jaime Lannister's nickname, and what deed earned him this title?",
  //   options: [
  //     "Lionheart; he won the Battle of Blackwater",
  //     "Kingslayer; he killed King Aerys II Targaryen",
  //     "The Hound; he fought alongside Sandor Clegane",
  //     "The Young Lion; he was a great knight in the Kingsguard",
  //   ],
  //   answer: "Kingslayer; he killed King Aerys II Targaryen",
  // },
  // {
  //   question:
  //     "What is the name of the leader of the Free Folk (Wildlings) who helps Jon Snow in the fight against the Night King?",
  //   options: [
  //     "Mance Rayder",
  //     "Ygritte",
  //     "Ragnar Blackhand",
  //     "Tormund Giantsbane",
  //   ],
  //   answer: "Tormund Giantsbane",
  // },
];

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-btn");
const resultContainer = document.getElementById("result-container");
const quizItemContainer = document.getElementById("quiz-item-container");
const scoreElement = document.getElementById("score");
const restartButton = document.getElementById("restart-btn");
const timeLeftElement = document.getElementById("time-left");
const progressBar = document.querySelector(".progress-bar");

let highscore = 0;
let timeLeft;
let timeInterval;

init();

function init() {
  currentQuestionIndex = 0;
  score = 0;
  shuffleArray(quizData);

  loadQuestion();
  quizItemContainer.style.display = "block";
  resultContainer.style.display = "none";
  progressBar.style.width = 0;
}

function startTimer() {
  timeLeft = 10;
  timeLeftElement.textContent = timeLeft;
  timeInterval = setInterval(() => {
    timeLeft--;
    timeLeftElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timeInterval);
      handleTimeout();
    }
  }, 1000);
}

function handleTimeout() {
  Array.from(optionsElement.children).forEach((btn) => (btn.disabled = true));
  nextButton.style.display = "block";
}

function updateProgressBar() {
  const progressPercentage = (currentQuestionIndex / quizData.length) * 100;
  progressBar.style.width = progressPercentage + "%";
}
function loadQuestion() {
  startTimer();

  const currentQuestion = quizData[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  optionsElement.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.classList.add("option");
    button.textContent = option;

    optionsElement.appendChild(button);
    button.addEventListener("click", () => selectAnswer(option, button));
  });

  nextButton.style.display = "none";
}

function selectAnswer(selectedOption, button) {
  clearInterval(timeInterval); // Stop the timer when an answer is selected

  const correctAnswer = quizData[currentQuestionIndex].answer;
  // console.log(correctAnswer);
  if (selectedOption === correctAnswer) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    // console.log("wrong");
  }

  handleTimeout();
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  updateProgressBar();

  if (currentQuestionIndex < quizData.length) loadQuestion();
  else {
    loadResults();
  }
});

function loadResults() {
  quizItemContainer.style.display = "none";
  resultContainer.style.display = "block";
  setHighscore();

  scoreElement.innerHTML = `score: ${score}/ ${quizData.length} <br> highscore: ${highscore}`;

  restartButton.style.display = "block";
}

restartButton.addEventListener("click", init);

const setHighscore = function () {
  if (score > highscore) highscore = score;
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at indices i and j
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}
