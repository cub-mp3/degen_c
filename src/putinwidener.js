document.addEventListener("DOMContentLoaded", (event) => {
  const imgContainer = document.querySelector(".wide-img-container");
  const containerHeight = imgContainer.offsetHeight; // Get the initial height in pixels

  const increaseWidth = function () {
    const currentWidth = imgContainer.offsetWidth;
    imgContainer.style.width = `${currentWidth + 40}px`; // Increase width by 20px on each key press
    imgContainer.style.height = `${containerHeight}px`; // Keep the height constant in pixels
  };
  document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
      event.preventDefault(); // Prevent the default action of the spacebar (scrolling)
      increaseWidth();
      playAudioooo();
    }
  });
  imgContainer.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent the default action of the spacebar (scrolling)
    increaseWidth();
    playAudioooo();
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("wide-walk-song");

  // Play audio when the page loads

  // Functions to control the audio playback
  window.playAudioooo = function () {
    audio.play();
  };

  window.pauseAudio = function () {
    audio.pause();
  };

  window.stopAudio = function () {
    audio.pause();
    audio.currentTime = 0; // Reset the audio to the beginning
  };
});
