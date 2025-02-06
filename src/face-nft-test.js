import mouth1 from "../imgs/face-nft-mouth-1.svg";
import mouth2 from "../imgs/face-nft-mouth-2.svg";
import mouth3 from "../imgs/face-nft-mouth-3.svg";

const svgContainer = document.querySelector(".svg-container");

function appendSvg(svgPath) {
  const existingMouth = svgContainer.querySelector(".mouth");
  if (existingMouth) {
    existingMouth.remove();
  }

  const img = document.createElement("img");
  img.src = svgPath;
  img.classList.add("mouth");
  svgContainer.appendChild(img);
}

const mouthButtons = document.querySelectorAll(".mouth-button");
const mouths = [mouth1, mouth2, mouth3];

mouthButtons.forEach((button, i) => {
  button.addEventListener("click", () => {
    console.log(i);
    appendSvg(mouths[i]);
  });
});

appendSvg(mouth1);

//eyes

const leftPupil = document.getElementById("left-pupil");
const eyeButtons = document.querySelectorAll(".eye-button");
const randomEye = document.querySelector(".random-eye-button");
const autoRandomColor = document.querySelector(".random-color-auto");

const eyeColorOptions = ["#00FF7F", "#FF007F", "#007FFF"];

function colorEyes(color) {
  leftPupil.style.fill = color;
  rightPupil.style.fill = color;
}

//button to eye color
//this was easier than i thought

function setupEyeButtons() {
  eyeButtons.forEach((button, index) => {
    const color = eyeColorOptions[index % eyeColorOptions.length];
    button.style.backgroundColor = color;

    button.addEventListener("click", () => colorEyes(color));
  });
}
//assign random eye color

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}

randomEye.addEventListener("click", () => {
  colorEyes(getRandomColor());
});

// set random color gen

let colorCycle = false;
let eyeLoop;

autoRandomColor.addEventListener("click", () => {
  if (!colorCycle) {
    loopEyeColor();
  } else {
    clearInterval(eyeLoop);
  }
  autoRandomColor.innerHTML = colorCycle ? "start" : "stop";

  colorCycle = !colorCycle;
});

function loopEyeColor() {
  eyeLoop = setInterval(() => colorEyes(getRandomColor()), 200);
}

function initEyes() {
  colorEyes(eyeColorOptions[0]);
  autoRandomColor.innerHTML = "start";
  setupEyeButtons();
}

initEyes();
