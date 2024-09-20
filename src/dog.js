fetch("https://api.thecatapi.com/v1/images/search")
  .then((response) => response.json())
  .then((data) => {
    const imageUrl = data[0].url;
    document.getElementById("cat-image").src = imageUrl;
  })
  .catch((error) => console.error("Error fetching the cat image:", error));
