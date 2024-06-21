const canvas = document.getElementById("polygonCanvas");
const ctx = canvas.getContext("2d");

// import hello from "../imgs/goggins.mp4";

//HEADING

// JavaScript for changing the color
const textElement = document.getElementById("colorfulText");
const backgroundElement = document.getElementById("colorfulBackground");
const colors = ["red", "green", "blue", "orange", "purple", "yellow"];

function changeColor() {
  // Get a random color from the array
  const color = colors[Math.floor(Math.random() * colors.length)];
  let color2 = colors[Math.floor(Math.random() * colors.length)];

  if (color === color2) {
    color2 = "pink";
  }
  // Set the color
  textElement.style.color = color;
  backgroundElement.style.backgroundColor = color2;
}

changeColor();

//POLYGON

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
    console.log(color);
  }

  return color;
}

function drawPolygon(vertices) {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
  ctx.fillStyle = getRandomColor();
  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.closePath();
  ctx.fill();
}

function getRandomPolygon() {
  const numVertices = Math.floor(Math.random() * 2) + 3; // Random vertices from 3 to 10
  const vertices = [];
  for (let i = 0; i < numVertices; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    vertices.push({ x, y });
  }
  return vertices;
}

// function displayVideo() {
//   const img = new Image();
//   img.onload = function () {
//     ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
//   };
//   // Change the source to an image you have access to or use an open image URL
//   img.src = hello; // Example placeholder image
// }

// video

const videoAttributes = function () {
  const videoElement = document.getElementById("gogginsVideo");

  videoElement.style.display = "block"; // Ensure the video is visible

  // Reset video properties
  videoElement.currentTime = 0; // Reset the video to the beginning
  videoElement.loop = false; // Ensure the video does not loop

  // Play the video automatically
  videoElement.play();

  // Prevent the user from pausing the video
  videoElement.addEventListener("pause", () => {
    if (!videoElement.ended) {
      videoElement.play();
    }

    function preventFullScreen(event) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else if (document.webkitFullscreenElement) {
        // Safari
        document.webkitExitFullscreen();
      } else if (document.mozFullScreenElement) {
        // Mozilla
        document.mozCancelFullScreen();
      }
      event.preventDefault();
    }

    videoElement.addEventListener("fullscreenchange", preventFullScreen, false);
    videoElement.addEventListener(
      "webkitfullscreenchange",
      preventFullScreen,
      false
    );
    videoElement.addEventListener(
      "mozfullscreenchange",
      preventFullScreen,
      false
    );
    videoElement.addEventListener(
      "msfullscreenchange",
      preventFullScreen,
      false
    );
  });

  // Remove all default controls from the video
  videoElement.removeAttribute("controls");

  // Pause and optionally hide the video after it has played
  videoElement.addEventListener("ended", () => {
    videoElement.pause();
    videoElement.style.display = "none"; // Optionally hide the video element
  });
};

const polygonCount = 0;

const renderImage = function () {
  drawPolygon(getRandomPolygon());

  if (polygonCount === Math.floor(Math.random() * colors.length)) {
    videoAttributes();
  }
};

export default {
  changeColor,
  canvas,
  ctx,
  polygonCount,
  getRandomColor,
  drawPolygon,
  getRandomPolygon,
  // displayImage,
  videoAttributes,

  renderImage,
};
