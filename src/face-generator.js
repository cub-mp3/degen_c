function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const showRandomColor = function () {
  const svgElements = document.querySelectorAll(".svg-box svg *");

  svgElements.forEach((element) => {
    if (element.tagName === "path") {
      element.style.fill = getRandomColor();
    } else {
      element.setAttribute("fill", getRandomColor());
    }
    showRandomSVG();
  });
};

document.addEventListener("keydown", (event) => {
  if (event.key === "a" || event.key === "A") {
    showRandomColor();
  }
});

//random svg
function showRandomSVG() {
  const svgs = ["svg1", "svg2", "svg3"];
  const randomSVG = svgs[Math.floor(Math.random() * svgs.length)];
  console.log(randomSVG);
  svgs.forEach((id) => {
    document.getElementById(id).style.display =
      id === randomSVG ? "block" : "none";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  // Your code here
  showRandomSVG();
  showRandomColor();
});

for (let i = 0; i < 10; i++) {
  // Change this number to create more or fewer SVGs
  container.appendChild(createSVG());
}
