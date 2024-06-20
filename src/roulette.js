//slot machine

const fruits = ["🍋", "🍒", "🍇", "🍌", "🍉"];

// const reel1 = document.getElementById("reel1");
// const reel2 = document.getElementById("reel2");
// const reel3 = document.getElementById("reel3");
// const result = document.getElementById("result");
// const spinButton = document.getElementById("spinButton");

// // result.textContent = "hey";

// const spin = function () {
//   reel1.textContent = fruits[Math.floor(Math.random() * fruits.length)];
//   reel2.textContent = fruits[Math.floor(Math.random() * fruits.length)];
//   reel3.textContent = fruits[Math.floor(Math.random() * fruits.length)];

//   if (
//     reel1.textContent === reel2.textContent &&
//     reel2.textContent === reel3.textContent
//   ) {
//     result.textContent = "Congratulations! You won!";
//   } else {
//     result.textContent = "Try again!";
//   }
// };

const vegetables = ["A", "C", "E"];

function spin() {
  const reels = [
    document.getElementById("reel1"),
    document.getElementById("reel2"),
    document.getElementById("reel3"),
  ];
  const result = document.getElementById("result");

  reels.forEach((reel) => {
    let spinCount = 10; // Determines how many times vegetables change before stopping
    let i = 0;
    const intervalId = setInterval(() => {
      reel.textContent =
        vegetables[Math.floor(Math.random() * vegetables.length)];
      i++;
      if (i >= spinCount) {
        clearInterval(intervalId);
      }
    }, 100); // Changes vegetable every 100 milliseconds
  });

  setTimeout(() => {
    if (
      reels[0].textContent !== reels[1].textContent &&
      reels[0].textContent !== reels[2].textContent &&
      reels[1].textContent !== reels[2].textContent
    ) {
      result.textContent = "A MINOR";
    } else {
      result.textContent = "Try again!";
    }
  }, 1100); // This should be slightly longer than the total spinning time
}

// console.log("is this working");

export default { spin, fruits, vegetables };
