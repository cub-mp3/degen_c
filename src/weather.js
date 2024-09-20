const form = document.getElementById("weather-form");
const city = document.getElementById("city");
const cityResult = document.getElementById("city-result");
const weatherResult = document.getElementById("weather-result");
const weatherResultContainer = document.getElementById(
  "weather-result-container"
);
const units = document.getElementById("units");
const timeFromText = document.getElementById("time-from");
const timeUntilText = document.getElementById("time-until");
const populationContainer = document.querySelector(".population-container");

const ctx = document.getElementById("weather-chart");
const container = document.querySelector(".container");

weatherResultContainer.style.display = "none";

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const city1 = city.value;
  fetchLatLong(city1);
  cityResult.innerHTML = `${city1} `;
});

async function fetchLatLong(country) {
  try {
    removeError();
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${country}&&language=en&format=json`
    );

    // console.log(response);

    if (!response.ok) {
      throw new Error("oh no");
    }

    const latLongData = await response.json();
    console.log("lat long data:", latLongData);

    const latitude = latLongData.results[0].latitude;
    const longitude = latLongData.results[0].longitude;
    const timezone = latLongData.results[0].timezone.split("/")[0];
    const population = latLongData.results[0].population;

    // console.log(latitude, longitude);
    fetchUserData(latitude, longitude);
    console.log(timezone, population);
    showPopulationTimezone(population, timezone);
  } catch (error) {
    showError();

    console.log(`error fetching data: ${error}`);
    weatherResultContainer.style.display = "none";
  }
}

async function fetchUserData(latitude, longitude) {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m`
    );
    // const response = await fetch(
    //   `https://api.open-meteo.com/v1/forecast?latitude=51.5&longitude=-0.120000124&hourly=temperature_2m`
    // );
    // console.log(response);

    if (!response.ok) {
      throw new Error("🔥🔥🔥🔥network response was not ok");
    }

    const userData = await response.json();
    console.log("user data:", userData);
    const hourly = userData.hourly;
    const time = userData.hourly.time;

    const highestTemp = Math.max(...hourly.temperature_2m);
    // console.log(highestTemp);
    weatherResult.innerHTML = highestTemp;
    weatherResultContainer.style.display = "block";

    const tempUnits = userData.hourly_units.temperature_2m;
    units.innerHTML = tempUnits;

    const timeFrom = time[0];
    console.log(timeFrom);

    const timeUntil = time[time.length - 1];

    showTimes(timeFrom, timeUntil);

    const tempData = userData.hourly.temperature_2m;
    // console.log(tempData);
    const timeDataRaw = userData.hourly.time;
    const timeData = timeDataRaw.map((timeDataRaw) =>
      convertToDDMMYYYY(timeDataRaw)
    );

    createGraph(tempData, timeData);
  } catch (error) {
    console.log(`🍲 error fetching user data: ${error}`);
  }
}
function showTimes(timeFrom, timeUntil) {
  const fromFormat = convertToReadabe(timeFrom);
  const untilFormat = convertToReadabe(timeUntil);
  timeFromText.innerHTML = fromFormat;
  timeUntilText.innerHTML = untilFormat;
}

function convertToReadabe(timestamp) {
  const date = new Date(timestamp);
  // console.log(date);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Use 12-hour time format
  };

  let formattedDate = date.toLocaleString("en-US", options);

  const hours = date.getHours();
  const mins = date.getMinutes();
  // console.log(hours, mins);
  if (hours === 0 && mins === 0) {
    formattedDate += "(midnight)";
  }
  if (hours === 12 && mins === 0) {
    formattedDate += "(midday)";
  }
  return formattedDate;
}

function convertToDDMMYYYY(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based

  return `${day}/${month}`;
}

const test = convertToDDMMYYYY("2024-09-02T00:00");
console.log(test);

function showPopulationTimezone(population, timezone) {
  populationContainer.innerHTML = "";
  const h2Population = document.createElement("h2");
  const h2Timezone = document.createElement("h2");
  h2Population.textContent = `population: ${population}`;
  h2Timezone.textContent = `timezone: ${timezone}`;

  populationContainer.appendChild(h2Population);
  populationContainer.appendChild(h2Timezone);
}

function createGraph(tempData, timeData) {
  const labels = timeData;
  const dataValues = tempData;

  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "weather data",
          data: dataValues,
          fill: true, // No filling under the line
          tension: 0.1, // Line tension (smoothness)
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
        },
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}

function showError() {
  removeError();
  const h2 = document.createElement("h2");
  h2.textContent = "invalid place";
  h2.classList.add("error-message");

  container.appendChild(h2);
}

function removeError() {
  let existingError = document.querySelector(".error-message");
  if (existingError) {
    existingError.remove();
  }
}
