"use strict";

import screenImg from "../ksi/the-screen.avif";
import ringImg from "../ksi/the-ring.webp";
import penImg from "../ksi/pen.jpg";
import kingImg from "../ksi/the-king.avif";
import spin from "../ksi/3dgifmaker53230.gif";

import skeetImg from "../ksi/skeet.png";

document.addEventListener("DOMContentLoaded", function () {
  const video = document.getElementById("thickOfItVideo");

  const skeet = document.querySelector(".skeet");

  const skeetKey = skeet.getAttribute("data-bg");

  video.removeAttribute("controls");

  video.playbackRate = 1;

  window.addEventListener("click", () => {
    video.play();
  });

  const loadingScreen = document.querySelector(".loading-screen");

  video.addEventListener("loadeddata", () => {
    loadingScreen.style.display = "none";

    loadImages();
  });

  video.load();

  let audioContext;

  window.addEventListener("click", () => {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaElementSource(video);

    const distortion = audioContext.createWaveShaper();

    distortion.curve = makeDistortionCurve(0);
    distortion.oversample = "4x";
    source.connect(distortion);
    distortion.connect(audioContext.destination);
  });

  function makeDistortionCurve(amount) {
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] =
        ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x));
    }
    return curve;
  }

  let clickCount = 0;

  video.addEventListener("click", function () {
    clickCount++;
    console.log(clickCount);

    const distortionAmount = clickCount * 10;
    video.playbackRate += 0.01;

    distortion.curve = makeDistortionCurve(distortionAmount);
  });

  function rotationForClick() {
    let deg = 1;
    console.log(window.innerWidth);

    document.querySelectorAll(".grid-item-inner").forEach((item) => {
      item.addEventListener("click", () => {
        item.style.transform = `rotateY(${180 * deg}deg)`;
        deg++;
        if (deg === 3) {
          deg = 1;
        }
      });
    });
  }

  if (window.innerWidth <= 768) {
    rotationForClick();
  }

  //intersection observer

  function loadImages() {
    const images = {
      screenImg: screenImg,
      ringImg: ringImg,
      penImg: penImg,
      kingImg: kingImg,
      skeetImg: skeetImg,
      spinImg: spin,
    };

    const lazyLoad = document.querySelectorAll(
      ".grid-item-back, .skeet, .spinny-gif"
    );

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          //   console.log(entry.target);
          const imgElement = entry.target;
          console.log(imgElement);
          const backgroundImage = imgElement.getAttribute("data-bg");
          const imgSrc = images[backgroundImage];

          //   console.log(backgroundImage);

          if (!imgElement.classList.contains("spinny-gif")) {
            imgElement.style.backgroundImage = `url(${imgSrc})`;
          } else {
            console.log("yes");
            // console.log(src);
            imgElement.src = imgSrc;
          }
          // imgElement.style.backgroundColor = `black`;

          observer.unobserve(imgElement);
        }
      });
    });

    lazyLoad.forEach((image) => {
      observer.observe(image);
    });
  }

  // skeet.style.backgroundImage = `url(${images[skeetKey]})`;
});
