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
const songItems = document.querySelectorAll(".song-item");
const skipButton = document.querySelector(".skip-button");
const prevButton = document.querySelector(".prev-button");
const mainControls = document.querySelector(".main-controls");

//play song

let songIndex;

songItems.forEach((item) => {
  setCover(item);
});

for (let i = 0; i < songItems.length; i++) {
  const item = songItems[i];
  item.setAttribute("data-index", i);
}

function setCover(item) {
  const songCover = item.dataset.cover;
  item.style.backgroundImage = `url("/${songCover}")`;
  item.style.backgroundSize = "contain";
}

function playSong(item) {
  const songSrc = item.dataset.src;
  audioElement.src = songSrc;
  // console.log(songSrc);
  audioElement.play();
  if ((audioControls.style.display = "none")) {
    audioControls.style.display = "grid";
  }

  const songName = item.dataset.name;
  const songTempo = item.dataset.tempo;
  const songKey = item.dataset.key;
  const songRelease = item.dataset.release;
  const songCover = item.dataset.cover;

  console.log(item.dataset.index);
  songIndex = item.dataset.index;

  songNameElement.textContent = `${songName}`;
  songTempoElement.textContent = `tempo: ${songTempo}`;
  songKeyElement.textContent = `key: ${songKey}`;
  songReleaseElement.textContent = `release date: ${songRelease}`;
  albumCoverElement.style.backgroundImage = `url("/${songCover}")`;
  songDownloadElement.style.display = "block";
  songDownloadElement.href = songSrc;

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  mainControls.style.visibility = "visible";

  // songIndex = songs.
}

songItems.forEach((item) => {
  item.addEventListener("click", () => {
    playSong(item);
  });
});

skipButton.addEventListener("click", function () {
  songIndex++;
  playSongByIndex(songIndex);
});

prevButton.addEventListener("click", function () {
  songIndex--;
  playSongByIndex(songIndex);
});
// prevButton.addEventListener("click", function () {
//   songIndex--;
//   playSongByIndex(songIndex);
// });

function playSongByIndex(index) {
  const item = songItems[index % songItems.length];
  playSong(item);
}

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

//slider

////////////////////////////////////

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const btnLeft = document.querySelector(".slider__btn--left");

const btnRight = document.querySelector(".slider__btn--right");

const maxLength = slides.length;

// slider.style.transform = 'scale(0.3)';

slides.forEach((s, i) => {
  s.style.transform = `translateX(${i * 100}%)`;
});

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

//array variable creates reference;

//numeric can creates a copy
