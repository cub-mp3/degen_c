// import Filter from "bad-words";

// function loadForbiddenWords() {
//   const filter = new Filter();
//   const allWords = filter.list;
//   console.log(...allWords);
// }

// loadForbiddenWords();

import Filter from "bad-words";

// Create an instance of the filter
const filter = new Filter();

// Function to check for forbidden words
const containsForbiddenWords = function (inputText) {
  return filter.isProfane(inputText);
};

document.addEventListener("DOMContentLoaded", function () {
  const inputForm = document.getElementById("inputForm");
  const userInput = document.getElementById("userInput");
  const userName = document.getElementById("userName");
  const itemList = document.getElementById("itemList");

  const invisible = document.querySelector(".invisible");

  // List of forbidden words
  // const forbiddenWords = ["bad"]; // Add the words you want to disallow

  loadStoredItems();

  // Add event listener for form submission
  if (inputForm) {
    inputForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const inputText = userInput.value;
      if (containsForbiddenWords(inputText)) {
        invisible.style.display = "block";

        setTimeout(function () {
          invisible.style.display = "none";
        }, 3000); // 3000 milliseconds = 3 seconds
      } else {
        addItem(userName.value, inputText);
        userInput.value = "";
        userName.value = "";
      }
    });
  } else {
    console.error("inputForm element not found");
  }

  function addItem(name, text) {
    //if not empty
    if (name.trim() !== "" && text.trim() !== "") {
      const li = document.createElement("li");
      li.textContent = `${name}: ${text}`;
      itemList.insertBefore(li, itemList.firstChild);

      storeItem(name, text);
    }
  }

  function storeItem(name, text) {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.push({ name, text });
    localStorage.setItem("items", JSON.stringify(items));
  }

  function loadStoredItems() {
    const items = JSON.parse(localStorage.getItem("items")) || [];
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.text}`;
      itemList.insertBefore(li, itemList.firstChild);
    });
  }
});
