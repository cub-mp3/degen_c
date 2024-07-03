document.addEventListener("DOMContentLoaded", (event) => {
  const imgContainer = document.querySelector(".wide-img-container");
  const containerHeight = imgContainer.offsetHeight; // Get the initial height in pixels
  const resetBtn = document.getElementById("reset-btn");

  const increaseWidth = function () {
    const currentWidth = imgContainer.offsetWidth;
    imgContainer.style.width = `${currentWidth + 40}px`; // Increase width by 40px
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
    event.preventDefault();
    increaseWidth();
    playAudioooo();
  });

  resetBtn.addEventListener("click", function () {
    imgContainer.style.width = "100%";
    console.log("reset clicked");
  });

  const audio = document.getElementById("wide-walk-song");

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
