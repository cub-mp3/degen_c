const playButton = document.getElementById("playButton");

const audioContext = new window.AudioContext();

const audioElement = document.querySelector("audio");

const track = audioContext.createMediaElementSource(audioElement);

const gainNode = audioContext.createGain();

const volumeControl = document.getElementById("volume");

playButton.addEventListener("click", () => {
  if (audioContext.state === "suspended") {
    audioContext.resume();
  }

  if (playButton.dataset.playing === "false") {
    audioElement.play();
    playButton.dataset.playing = "true";
  } else if (playButton.dataset.playing === "true") {
    audioElement.pause();
    playButton.dataset.playing = "false";
  }
});

audioElement.addEventListener(
  "ended",
  () => (playButton.dataset.playing = "false")
);

//volume

volumeControl.addEventListener("input", () => {
  gainNode.gain.value = parseFloat(volumeControl.value);
});

//panner

const pannerOptions = { pan: 0 };

const panner = new StereoPannerNode(audioContext, pannerOptions);

const pannerControl = document.getElementById("panner");

pannerControl.addEventListener("input", () => {
  panner.pan.value = pannerControl.value;
});

volumeControl.addEventListener("dblclick", () => {
  volumeControl.value = 1;
  gainNode.gain.value = parseFloat(volumeControl.value);
});
pannerControl.addEventListener("dblclick", () => {
  pannerControl.value = 0;
  panner.pan.value = pannerControl.value;
});

const filterControl = document.getElementById("filter");

const filter = audioContext.createBiquadFilter();
filterControl.value = 0;
filter.frequency.value = filterControl.value;
filter.type = "allpass";
filter.frequency.value = audioContext.sampleRate / 2; // Set to Nyquist frequency
console.log("filter is neutral");

filterControl.addEventListener("input", () => {
  const value = parseFloat(filterControl.value);
  if (value < 0) {
    filter.type = "lowpass";
    filter.frequency.value = 100 + Math.exp((100 + value) / 10); // Exponential scaling for lowpass
    console.log(value);
    console.log(filter.frequency.value);
  } else if (value > 0) {
    filter.type = "highpass";
    filter.frequency.value = Math.exp(value / 11); // Exponential scaling for highpass
    console.log(filter.frequency.value);
  }
});

filterControl.addEventListener("dblclick", () => {
  filterControl.value = 0;
  filter.frequency.value = filterControl.value;
  filter.type = "allpass";
  filter.frequency.value = audioContext.sampleRate / 2; // Set to Nyquist frequency
  console.log("filter is neutral");
});

track
  .connect(gainNode)
  .connect(panner)
  .connect(filter)
  .connect(audioContext.destination);

console.log(Math.exp((-50 + 100) / 10));
