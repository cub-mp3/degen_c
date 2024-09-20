let currentInput = "";
let previousInput = "";
let operation = undefined;

const display = document.getElementById("display");

function appendNumber(number) {
  currentInput = currentInput + number;
  updateDisplay();
}

function updateDisplay() {
  display.value = currentInput;
}

function chooseOperation(op) {
  if (currentInput === "") return;
  if (previousInput !== "") {
    calculate();
  }
  operation = op;
  previousInput = currentInput;
  currentInput = "";
}

function calculate() {
  const prev = parseFloat(previousInput);
  const current = parseFloat(currentInput);
  if (isNaN(prev) || isNaN(current)) return;

  switch (operation) {
    case "+":
      result = prev + current;
      break;
    case "-":
      result = prev - current;
      break;
    case "*":
      result = prev * current;
      break;
    case "/":
      result = prev / current;
      break;
    default:
      return;
  }
  currentInput = result;
  reset();
}
function reset() {
  updateDisplay();
  operation = undefined;
  previousInput = "";
}

function clearDisplay() {
  currentInput = "";
  reset();
}
