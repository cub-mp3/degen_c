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

const songContainer = document.querySelector(".song-container");

function createSongs() {
  songs.forEach((songData) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.setAttribute("draggable", "true");
    songElement.style.backgroundImage = `url(${songData.cover})`;
    songContainer.appendChild(songElement);
  });
}
createSongs();

let draggedItem = null;

const item = document.querySelectorAll(".song");
const dropZone = document.querySelectorAll(".tier-list-row, .container");

item.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    draggedItem = item;
    event.dataTransfer.effectAllowed = "move";
  });
});

function handleDrop(zone) {
  if (draggedItem) {
    if (zone.classList.contains("tier-list-row")) {
      zone.appendChild(draggedItem);
      draggedItem.style.width = "20%";
    } else {
      songContainer.appendChild(draggedItem);
      draggedItem.style.width = "100%";
    }
    draggedItem = null;
  }
}

dropZone.forEach((zone) => {
  zone.addEventListener("dragover", (event) => event.preventDefault());
  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    handleDrop(zone);
  });
});
