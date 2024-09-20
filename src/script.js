document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const navLinks = document.getElementById("nav-links");

  menuIcon.addEventListener("click", () => {
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
    }
  });
});

const nav = document.querySelector(".header__nav-links");
const navLinks = document.querySelectorAll(".header__nav-link");

nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("header__nav-link")) {
    const link = e.target;
    const siblings = link
      .closest(".header__nav-links")
      .querySelectorAll(".header__nav-link");
    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = 0.5;
    });
  }
});

nav.addEventListener("mouseout", function (e) {
  navLinks.forEach((el) => {
    el.style.opacity = 1;
  });
});

//links
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".header__nav-item");

  // Function to check screen size
  function checkScreenSize() {
    return window.innerWidth >= 768; // Change 768 to your breakpoint for laptop sizes
  }

  if (checkScreenSize()) {
    navItems.forEach(function (item) {
      const projectsContent = item.querySelector(".projects-content");

      if (projectsContent) {
        // Track mouse over state
        let isMouseOverItem = false;
        let isMouseOverContent = false;

        // Event listeners for the nav item
        item.addEventListener("mouseover", function () {
          isMouseOverItem = true;
          projectsContent.classList.remove("projects-hidden");
        });

        item.addEventListener("mouseout", function () {
          isMouseOverItem = false;
          if (!isMouseOverContent) {
            projectsContent.classList.add("projects-hidden");
          }
        });

        // Event listeners for the projects content
        projectsContent.addEventListener("mouseover", function () {
          isMouseOverContent = true;
          projectsContent.classList.remove("projects-hidden");
        });

        projectsContent.addEventListener("mouseout", function () {
          isMouseOverContent = false;
          if (!isMouseOverItem) {
            projectsContent.classList.add("projects-hidden");
          }
        });
      }
    });
  }
});

//interesection observers

// Define the callback function for sections
const sectionObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Handle sections
      entry.target.classList.remove("hidden");
    }
  });
};

// Create an Intersection Observer instance for sections
const sectionObserver = new IntersectionObserver(sectionObserverCallback, {
  root: null,
  threshold: 0.5, // Adjust this value as needed
});

// Select all section elements to be observed
const sections = document.querySelectorAll("section");
sections.forEach((section) => {
  sectionObserver.observe(section);
  section.classList.add("hidden");
});

// Define the callback function for lazy loading images
const imageObserverCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const image = entry.target;
      image.src = image.getAttribute("data-src");
      image.classList.remove("lazy-load"); // Remove class when loaded
      observer.unobserve(image);
    }
  });
};

// Create an Intersection Observer instance for images
const imageObserver = new IntersectionObserver(imageObserverCallback, {
  root: null,
  threshold: 0.5, // Adjust this value as needed
});

// Select all lazy-load images to be observed
const lazyLoadImages = document.querySelectorAll("img.lazy-load");

lazyLoadImages.forEach((image) => {
  imageObserver.observe(image);
});

//slider
document.addEventListener("DOMContentLoaded", function () {
  let slideIndex = 0;
  const slides = document.querySelector(".slides");
  const totalSlides = slides.children.length;
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  function moveSlide(n) {
    slideIndex = (slideIndex + n + totalSlides) % totalSlides;
    console.log(slideIndex);
    slides.style.transform = `translateX(-${slideIndex * 100}%)`;
  }

  prev.addEventListener("click", function () {
    moveSlide(-1);
  });

  next.addEventListener("click", function () {
    moveSlide(1);
  });
});
