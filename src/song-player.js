import cover1 from "./songs-for-website/covers/time-2.png";

import cover2 from "./songs-for-website/covers/another-npc.png";
import cover3 from "./songs-for-website/covers/soup.png";
import cover4 from "./songs-for-website/covers/the-wheel-of-fortune.png";
import cover5 from "./songs-for-website/covers/the-wheel-of-fortune.png";
import cover6 from "./songs-for-website/covers/head-in-the-clouds.png";

import source1 from "./songs-for-website/songs/time-2.wav";
import source2 from "./songs-for-website/songs/another-npc.wav";
import source3 from "./songs-for-website/songs/soup.wav";
import source4 from "./songs-for-website/songs/the-wheel-of-fortune-1.wav";
import source5 from "./songs-for-website/songs/the-wheel-of-fortune-2.wav";
import source6 from "./songs-for-website/songs/head-in-the-clouds.wav"; // Assuming you want to include this for the last song

const songs = [
  {
    id: "time-2",
    cover: cover1,
    src: source1,
    name: "time 2",
    tempo: "128 BPM",
    key: "E Minor",
    release: "09.09.24",
  },
  {
    id: "another-npc",
    cover: cover2,
    src: source2,
    name: "when another npc tells u not to put ur student loan into shitcoin",
    tempo: "128 BPM",
    key: "E Minor",
    release: "09.09.24",
  },
  {
    id: "soup",
    cover: cover3,
    src: source3,
    name: "soup (with sula)",
    tempo: "128 BPM",
    key: "E Minor",
    release: "09.09.24",
  },
  {
    id: "the-wheel-of-fortune-1",
    cover: cover4,
    src: source4,
    name: "the wheel of fortune i",
    tempo: "128 BPM",
    key: "E Minor",
    release: "09.09.24",
  },
  {
    id: "the-wheel-of-fortune-2",
    cover: cover5, // Same cover as the first wheel of fortune
    src: source5, // Source for the second wheel of fortune
    name: "the wheel of fortune ii",
    tempo: "128 BPM",
    key: "E Minor",
    release: "09.09.24",
  },
  {
    id: "head-in-the-clouds",
    cover: cover6,
    src: source6,
    name: "head in the clouds",
    tempo: "128 BPM",
    key: "E Minor",
    release: "09.09.24",
  },
  {
    id: "placeholder",
    src: source6,
    name: "placeholder",
    tempo: "120 BPM",
    key: "C",
    release: "01.01.01",
  },
  {
    id: "placeholder",
    src: source6,
    name: "placeholder",
    tempo: "120 BPM",
    key: "C",
    release: "01.01.01",
  },
  {
    id: "placeholder",
    src: source6,
    name: "placeholder",
    tempo: "120 BPM",
    key: "C",
    release: "01.01.01",
  },
  {
    id: "placeholder",
    src: source6,
    name: "placeholder",
    tempo: "120 BPM",
    key: "C",
    release: "01.01.01",
  },
];

const audioSection = document.querySelector(".audio-section");
const audioControls = document.querySelector(".audio-controls-container");
const audioElement = document.getElementById("audioElement");
const audioContext = new window.AudioContext();
const track = audioContext.createMediaElementSource(audioElement);

const songNameElement = document.getElementById("song-name");
const songTempoElement = document.getElementById("song-tempo");
const songKeyElement = document.getElementById("song-key");
const songReleaseElement = document.getElementById("song-key");
const albumCoverElement = document.querySelector(".album-cover");
const songDownloadElement = document.getElementById("song-download");
const skipButton = document.querySelector(".skip-button");
const prevButton = document.querySelector(".prev-button");
const mainControls = document.querySelector(".main-controls");

const sliderSection = document.querySelector(".slider-section");

const slider = document.querySelector(".slider");

const btnLeft = document.querySelector(".slider__btn--left");

const btnRight = document.querySelector(".slider__btn--right");
const audioToggle = document.querySelector(".toggle-audio-button");

let songIndex;

let playerDisplay = false;

//play songs

let songItems;

function isPhoneSize() {
  // console.log(window.innerWidth);
  return window.innerWidth <= 767;
}

function setupSongs() {
  songItems = document.querySelectorAll(".song-item");
  songItems.forEach((slide) => slide.remove());

  songs.forEach((song, i) => {
    const songItem = document.createElement("div");
    songItem.classList.add("song-item", "slide");
    slider.appendChild(songItem);
    // const songCover = song.cover;
    if (song.cover) {
      songItem.style.backgroundImage = `url('${song.cover}')`;
      songItem.style.backgroundSize = "contain";
    } else {
      songItem.classList.add("placeholder-song");
    }

    if (!isPhoneSize()) {
      songItem.style.transform = `translateX(${i * 100}%)`;
    }
  });
  songItems = document.querySelectorAll(".song-item");

  songItems.forEach((item, i) => {
    item.addEventListener("click", () => {
      playSong(i);
      if (isPhoneSize()) {
        audioSection.style.display = "block";
        console.log(playerDisplay);
        toggleAudio();
      }
    });
  });
}
setupSongs();

function playSong(index) {
  const song = songs[index];
  // console.log(song);
  const songSrc = song.src;
  audioElement.src = songSrc;
  // console.log(songSrc);
  audioElement.play();
  if (isPhoneSize()) {
    audioControls.style.display = "flex";
    audioToggle.style.display = "block";
  } else {
    audioControls.style.display = "grid";
  }

  const songName = song.name;
  const songTempo = song.tempo;
  const songKey = song.key;
  const songRelease = song.release;
  const songCover = song.cover;
  songIndex = index;

  songNameElement.textContent = `${songName}`;
  songTempoElement.textContent = `tempo: ${songTempo}`;
  songKeyElement.textContent = `key: ${songKey}`;
  songReleaseElement.textContent = `release date: ${songRelease}`;
  albumCoverElement.style.backgroundImage = `url("${songCover}")`;
  songDownloadElement.style.display = "block";
  songDownloadElement.href = songSrc;

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  mainControls.style.visibility = "visible";
}

skipButton.addEventListener("click", function () {
  playSong((parseInt(songIndex) + 1) % songItems.length);
});

prevButton.addEventListener("click", function () {
  playSong((songIndex - 1 + songItems.length) % songItems.length);
});

//sliider setup

function setupSlider() {
  if (!isPhoneSize()) {
    let curSlide = 0;

    const slides = document.querySelectorAll(".slide");
    const maxLength = slides.length;

    btnRight.addEventListener("click", function () {
      // console.log(curSlide);
      if (curSlide === maxLength - 3) {
        curSlide = 0;
      } else {
        curSlide += 1;
      }

      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
      );
    });
    btnLeft.addEventListener("click", function () {
      if (curSlide === 0) {
        curSlide = maxLength - 3;
      } else {
        curSlide -= 1;
      }

      slides.forEach(
        (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
      );
    });
  }
}

setupSlider();

//fx

//add reset button
//add loading icon

//add visuals for amounts of fx

function updateAudioParam(param, control) {
  param.value = control.value;
}

function resetControls(param, control, resetValue = 0) {
  control.value = resetValue;
  updateAudioParam(param, control);
}

//pan

const panner = new StereoPannerNode(audioContext);
const pannerControl = document.getElementById("panner-control");

pannerControl.addEventListener("input", () => {
  updateAudioParam(panner.pan, pannerControl);
});

pannerControl.addEventListener("dblclick", () => {
  resetControls(panner.pan, pannerControl);
});

//delay
const delay = audioContext.createDelay();
delay.delayTime.value = 0.5;

const delayControl = document.getElementById("delay-control");
const feedback = audioContext.createGain();

delayControl.addEventListener("input", () => {
  updateAudioParam(feedback.gain, delayControl);
});

delayControl.addEventListener("dblclick", () => {
  resetControls(feedback.gain, delayControl);
});

//distortion
const distortionControl = document.getElementById("distortion-control"); // Assume you have an input element

const distortion = audioContext.createWaveShaper();

function makeDistortionCurve(amount) {
  const samples = 44100;
  const curve = new Float32Array(samples);

  for (let i = 0; i < samples; i++) {
    const x = (i * 2) / samples - 1;
    curve[i] = x * (amount + 1);
  }
  return curve;
}

distortion.oversample = "2x"; // Optional, for smoother sound

function resetDistortion() {
  distortionControl.value = 0;
  distortion.curve = makeDistortionCurve(distortionControl.value);
}

distortionControl.addEventListener("input", () => {
  distortion.curve = makeDistortionCurve(distortionControl.value);
});

distortionControl.addEventListener("dblclick", () => {
  resetDistortion();
});

//filter

const filterControl = document.getElementById("filter");

const filter = audioContext.createBiquadFilter();
filterControl.value = 0;
filter.frequency.value = filterControl.value;
filter.type = "allpass";
filter.frequency.value = audioContext.sampleRate / 2; // Set to Nyquist frequency
// console.log("filter is neutral");

filterControl.addEventListener("input", () => {
  const value = parseFloat(filterControl.value);
  if (value < 0) {
    filter.type = "lowpass";
    filter.frequency.value = 100 + Math.exp((100 + value) / 10); // Exponential scaling for lowpass
    // console.log(value);
    // console.log(filter.frequency.value);
  } else if (value > 0) {
    filter.type = "highpass";
    filter.frequency.value = Math.exp(value / 11); // Exponential scaling for highpass
    // console.log(filter.frequency.value);
  }
});

filterControl.addEventListener("dblclick", () => {
  resetFilter();
});

function resetFilter() {
  filterControl.value = 0;
  filter.frequency.value = filterControl.value;
  filter.type = "allpass";
  filter.frequency.value = audioContext.sampleRate / 2; // Set to Nyquist frequency
  // console.log("filter is neutral");
}

function setupAudio() {
  track
    .connect(distortion)

    .connect(delay)
    .connect(feedback)
    .connect(delay)
    .connect(panner)
    .connect(filter)

    .connect(audioContext.destination);
}

setupAudio();

const resetFxButton = document.getElementById("reset-fx");

function initFx() {
  resetControls(feedback.gain, delayControl);
  resetControls(panner.pan, pannerControl);
  resetDistortion();
  resetFilter();
}

initFx();

resetFxButton.addEventListener("click", function () {
  initFx();
});

window.addEventListener("resize", () => {
  setupSongs();

  setupSlider();
});

//audio toggle button

// function toggleAudio() {
//   if (playerDisplay) {
//     console.log("grid");
//     audioControls.style.display = "none"; // Hide audio controls
//     audioSection.style.position = "relative"; // Reset position
//     audioToggle.style.transform = "rotate(180deg)"; // Rotate button
//     sliderSection.style.display = "block";

//     playerDisplay = false;
//   } else {
//     console.log("show song");
//     playerDisplay = true;
//     audioControls.style.display = "flex"; // Show audio controls
//     audioSection.style.position = "absolute"; // Set to absolute
//     audioSection.style.display = "block"; // Ensure section is visible
//     audioToggle.style.transform = "rotate(0deg)"; // Reset rotation
//     sliderSection.style.display = "none";
//   }
// }

window.toggleAudio = toggleAudio;

function toggleAudio() {
  playerDisplay = !playerDisplay;
  const display = playerDisplay ? "flex" : "none";
  const position = playerDisplay ? "absolute" : "relative";
  const sliderDisplay = playerDisplay ? "none" : "block";
  const rotate = playerDisplay ? "rotate(0deg)" : "rotate(180deg)";

  audioControls.style.display = display;
  audioSection.style.position = position;
  audioToggle.style.transform = rotate;
  sliderSection.style.display = sliderDisplay;
}

import eye from "../imgs/eye.svg";
import { intersection } from "lodash-es";

const spaceContainer = document.querySelector(".space-container");
const emptySpace = document.querySelector(".empty-space");
const eyeElements = document.querySelectorAll(".eyes");

console.log(eyeElements);

// function toggleEyes(element, color1, color2) {
//   const currentColor = element.style.fill || element.getAttribute("fill");
//   console.log(`current color ${currentColor}`);
//   newColor = currentColor === color1 ? color2 : color1;
//   console.log(newColor);
//   element.style.fill = newColor;
// }
// function triggerFace() {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       emptySpace.style.display = "flex";
//       resolve();
//     }, 1000);
//   }).then(() => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         emptySpace.style.display = "none";
//         resolve();
//       }, 500);
//     });
//   });
// }
// function triggerFace() {
//   setTimeout(() => {
//     emptySpace.style.display = "flex";
//     setTimeout(() => {
//       emptySpace.style.display = "none";
//     }, 500);
//   }, 1000);
// }

// i need this

let eyesVisible = false;

function flickerFace() {
  let counter = 0;

  console.log("triggering flicker face");
  const flickerFaceInterval = setInterval(() => {
    emptySpace.style.display = eyesVisible ? "none" : "flex";
    eyesVisible = !eyesVisible;
    console.log(eyesVisible);
    counter++;
    if (counter >= 4) {
      clearInterval(flickerFaceInterval);
      // console.clear();
    }
  }, 500);
}

if (isPhoneSize) {
  fetch(eye)
    .then((response) => {
      return response.text();
    })
    .then((svgText) => {
      eyeElements.forEach((e) => {
        e.innerHTML = svgText;
        const eyelid = e.querySelector(".eyelid");
        const pupil = e.querySelector(".pupil");
        // let counter = 0;

        // const flickerEyes = setInterval(() => {
        //   toggleEyes(eyelid, "rgb(0, 0, 0)", "rgb(255, 255, 255)");
        //   toggleEyes(pupil, "rgb(0, 0, 0)", "rgb(255, 255, 255)");
        //   counter++;
        //   if (counter >= 2) {
        //     clearInterval(flickerEyes);
        //     // console.clear();
        //   }
        // }, 500);
      });
    });

  const observer = new IntersectionObserver((entries) =>
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        console.log("intersection");
        flickerFace();
        // observer.unobserve(entry.target);
      }
    })
  );

  observer.observe(spaceContainer);
}

if (!isPhoneSize) {
  spaceContainer.style.display = "none";
}
