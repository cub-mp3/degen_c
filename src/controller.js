// app.js
import Polygon from "./polygon.js";

// Change the color every second
setInterval(Polygon.changeColor, 2000);

// Draw the initial polygon
Polygon.drawPolygon(Polygon.getRandomPolygon());

Polygon.canvas.addEventListener("click", function () {
  Polygon.renderImage();
});

// import Roulette from "./roulette.js";

// spinButton.addEventListener("click", Roulette.spin);
