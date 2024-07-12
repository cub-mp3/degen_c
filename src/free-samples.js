import sushiImg from "/imgs/sushi.png"; // Ensure this path is correct

document.addEventListener("DOMContentLoaded", () => {
  const plate = document.getElementById("plate");
  const controls = document.getElementById("controls");
  const respawnButton = document.getElementById("respawnButton");
  const sushiCountSlider = document.getElementById("sushiCountSlider");
  const sushiCountDisplay = document.getElementById("sushiCountDisplay");

  let sushiCount = parseInt(sushiCountSlider.value, 10);

  sushiCountSlider.addEventListener("input", function () {
    sushiCount = parseInt(this.value, 10);
    sushiCountDisplay.textContent = sushiCount;
  });

  function getRandomPosition() {
    const x = Math.random() * 60;
    const y = Math.random() * 60;
    return { x, y };
  }

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  function addSushi() {
    for (let i = 0; i < sushiCount; i++) {
      const sushi = document.createElement("img");
      sushi.src = sushiImg; // Ensure this path is correct
      // sushi.src = "/imgs/sushi.png";
      sushi.alt = "Sushi";
      sushi.className = "sushi";
      const { x, y } = getRandomPosition();
      sushi.style.left = `${x + 10}%`;
      sushi.style.top = `${y + 10}%`;
      sushi.addEventListener("click", function () {
        sushi.remove();
        checkPlateEmpty();
      });
      plate.appendChild(sushi);
    }
    checkPlateEmpty();
  }

  function respawnSushi() {
    plate.innerHTML = "";
    plate.style.backgroundColor = getRandomColor();
    addSushi();
  }

  function checkPlateEmpty() {
    const sushiElements = plate.querySelectorAll(".sushi");
    if (sushiElements.length === 0) {
      controls.style.display = "flex";
    } else {
      controls.style.display = "none";
    }
  }

  respawnButton.addEventListener("click", respawnSushi);

  addSushi();
});
