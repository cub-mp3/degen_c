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

const buttons = document.querySelectorAll(".button");
const mouths = [mouth1, mouth2, mouth3];
buttons.forEach((button, i) => {
  button.addEventListener("click", () => {
    console.log(i);
    appendSvg(mouths[i]);
  });
});

appendSvg(mouth1);
