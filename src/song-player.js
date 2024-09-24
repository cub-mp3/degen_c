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
];

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

const slider = document.querySelector(".slider");

const btnLeft = document.querySelector(".slider__btn--left");

const btnRight = document.querySelector(".slider__btn--right");

let songIndex;

let curSlide = 0;

//play songs

songs.forEach((song, i) => {
  const songItem = document.createElement("div");
  songItem.classList.add("song-item", "slide");
  slider.appendChild(songItem);
  // const songCover = song.cover;
  songItem.style.backgroundImage = `url('${song.cover}')`;

  songItem.style.backgroundSize = "contain";
  songItem.style.transform = `translateX(${i * 100}%)`;
});

const songItems = document.querySelectorAll(".song-item");
console.log(songItems);

songItems.forEach((item, i) => {
  item.addEventListener("click", () => {
    playSong(i);
  });
});

function playSong(index) {
  const song = songs[index];
  console.log(song);
  const songSrc = song.src;
  audioElement.src = songSrc;
  // console.log(songSrc);
  audioElement.play();
  if ((audioControls.style.display = "none")) {
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

  // songIndex = songs.
}

skipButton.addEventListener("click", function () {
  songIndex = (parseInt(songIndex) + 1) % songItems.length;

  playSong(songIndex);
});

prevButton.addEventListener("click", function () {
  songIndex = (songIndex - 1 + songItems.length) % songItems.length; // Decrement and wrap around
  console.log(`${songIndex} remainder ${songItems.length}`);
  playSong(songIndex);
});
// prevButton.addEventListener("click", function () {
//   songIndex--;
//   playSongByIndex(songIndex);
// });

//sliider setup

const slides = document.querySelectorAll(".slide");
const maxLength = slides.length;

btnRight.addEventListener("click", function () {
  // console.log(curSlide);
  if (curSlide === maxLength - 3) {
    curSlide = 0;
  } else {
    curSlide += 1;
    console.log(curSlide);
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

//fx

//pan

const panner = new StereoPannerNode(audioContext);
const pannerControl = document.getElementById("panner-control");

function connectPan() {
  panner.pan.value = pannerControl.value;
}

pannerControl.addEventListener("input", () => {
  connectPan();
});

pannerControl.addEventListener("dblclick", () => {
  pannerControl.value = 0;
  connectPan();
});

//delay
const delay = audioContext.createDelay();
delay.delayTime.value = 0.5;

const delayControl = document.getElementById("delay-control");
const feedback = audioContext.createGain();
delayControl.value = 0;
connectDelay();

function connectDelay() {
  feedback.gain.value = delayControl.value;
}

delayControl.addEventListener("input", () => {
  feedback.gain.value = delayControl.value;
});

delayControl.addEventListener("dblclick", () => {
  delayControl.value = 0;
  connectDelay();
});

//reverb

// const reverb = audioContext.createConvolver();

// async function loadImpulseResponse(url) {
//   const response = await fetch(url);
//   const arrayBuffer = await response.arrayBuffer();
//   const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

//   return audioBuffer;
// }
// //connecting everything

// loadImpulseResponse("./audio/IR.wav").then((impulseResponse) => {
//   reverb.buffer = impulseResponse;
// });

// const reverbGain = audioContext.createGain();

// const reverbControl = document.getElementById("reverb-control");

// reverbControl.value = 0;

// function connectReverb() {
//   reverbGain.gain.value = reverbControl.value;
// }

// reverbControl.addEventListener("input", () => {
//   connectReverb();
// });

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
  filterControl.value = 0;
  filter.frequency.value = filterControl.value;
  filter.type = "allpass";
  filter.frequency.value = audioContext.sampleRate / 2; // Set to Nyquist frequency
  // console.log("filter is neutral");
});

function setupAudio() {
  track
    .connect(delay)
    .connect(feedback)
    .connect(delay)
    .connect(panner)
    .connect(filter)

    .connect(audioContext.destination);
}

setupAudio();