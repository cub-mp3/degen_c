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

import sus1 from "../imgs/sus1.webp";
import sus2 from "../imgs/sus2.webp";
import sus3 from "../imgs/sus3.webp";
import sus4 from "../imgs/sus4.webp";

import socialCredit from "../imgs/social-credit.webp";

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

//create songs

const songGrid = document.querySelector(".song-grid");

function createSongs() {
  songs.forEach((songData) => {
    const songElement = document.createElement("div");
    songElement.classList.add("song");
    songElement.setAttribute("draggable", "true");
    songElement.style.backgroundImage = `url(${songData.cover})`;
    songGrid.appendChild(songElement);
  });
}
createSongs();

//drag and drop

let draggedItem = null;

const item = document.querySelectorAll(".song");
const dropZone = document.querySelectorAll(".tier-list-row, .song-container");
const popupSection = document.querySelector(".popup-section");

item.forEach((item) => {
  item.addEventListener("dragstart", (event) => {
    draggedItem = item;
    event.dataTransfer.effectAllowed = "move";
  });
});

dropZone.forEach((zone) => {
  zone.addEventListener("dragover", (event) => event.preventDefault());
  zone.addEventListener("drop", (event) => {
    event.preventDefault();
    handleDrop(zone);
  });
});

function handleDrop(zone) {
  if (draggedItem) {
    if (zone.classList.contains("tier-list-row")) {
      tierListDrop(zone);
      if (zone.classList.contains("f-tier-row")) {
        fPopup();
      }
      if (zone.classList.contains("s-tier-row")) {
        sPopup();
      }
    } else {
      songGrid.appendChild(draggedItem);
      draggedItem.style.width = "100%";
    }
    draggedItem = null;
  }
}

function tierListDrop(zone) {
  zone.appendChild(draggedItem);
  draggedItem.style.width = "20%";
}

//popup
let popup;

function fPopup() {
  createPopup();
  popup.src = [sus1, sus2, sus3, sus4][Math.floor(Math.random() * 4)];
}
function sPopup() {
  createPopup();
  popup.src = socialCredit;
}

function createPopup() {
  const existingPopup = document.querySelector(".popup");
  if (existingPopup) {
    existingPopup.remove();
  }
  popup = document.createElement("img");
  popup.classList.add("popup");
  popupSection.appendChild(popup);
  popupFadeOut(popup);
  popup.style.height = "100%";

  return popup;
}

function popupFadeOut(popup) {
  popup.style.opacity = 1;

  popup.style.transition = "opacity ease-in-out 2s";

  setTimeout(() => {
    popup.style.opacity = 0;
  }, 200);
}
