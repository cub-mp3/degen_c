// Create a div element

import exampleImage from "./another-npc.png";

import cover1 from "./songs-for-website/covers/time-2.png";

const divElement = document.createElement("div");

divElement.style.backgroundImage = `url('${exampleImage}')`;
divElement.classList.add("cubidubi");
divElement.style.width = "300px";
divElement.style.height = "300px";

const imageContainer = document.getElementById("image-container");

imageContainer.appendChild(divElement);

// import exampleImage from "./another-npc.png";

// // Create an image element
// const imgElement = document.createElement("img");
// imgElement.src = exampleImage;
// imgElement.alt = "Dynamically loaded image";

// // Add the image to the DOM
// const imageContainer = document.getElementById("image-container");
// imageContainer.appendChild(imgElement);
