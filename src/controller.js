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

function formatDate(input) {
  // Parse the input date string assuming DD/MM/YYYY format
  const parts = input.split(/[/, :]/);
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1; // JavaScript months are 0-indexed

  // Create a Date object
  const date = new Date(year, month, day, hours, minutes);

  // Format the date into the desired output
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "UTC",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  // Extract and reformat the date parts
  const formattedParts = formatter.formatToParts(date);
  const resultMap = {};
  formattedParts.forEach((part) => {
    resultMap[part.type] = part.value;
  });

  // Construct the final formatted string
  return `${resultMap.year}-${resultMap.month}-${resultMap.day} ${resultMap.hour}:${resultMap.minute} UTC`;
}
