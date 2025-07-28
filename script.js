function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

let operand1 = 0;
let operator;
let operand2;

function operate(operand1, operator, operand2) {
    switch (operator) {
        case ("+"):
            add(operand1, operand2);
        case ("-"):
            subtract(operand1, operand2);
        case ("*"):
            multiply(operand1, operand2);
        case ("/"):
            divide(operand1, operand2);
        default:
            break;
    }
}

let buttons = 
[
    ["(", ")", "%", "AC"],
    ["7", "8", "9", "÷"],
    ["4", "5", "6", "x"],
    ["1", "2", "3", "-"],
    ["0", ".", "=", "+"]
];

const calculator = document.querySelector(".calculator");
const calcButtons = document.querySelector(".buttons");
function createButtons() {
    for (let i = 0; i < buttons.length; i++) {
        let row = document.createElement("div");
        row.classList.toggle("row");
        for (let j = 0; j < buttons[i].length; j++) {
            let button = document.createElement("div");
            button.classList.toggle("calc-button");
            button.textContent = buttons[i][j];
            row.append(button);
        }
        calcButtons.append(row);
    }
}

createButtons();

const displayArea = document.querySelector(".display");
calcButtons.addEventListener("click", (e) => {
    const buttonPressed = e.target.textContent;
    if (!e.target.classList.contains("calc-button")) {
        return;
    }
    if (buttonPressed >= '0' && buttonPressed <= '9') {
        displayArea.textContent += buttonPressed;
        console.log(buttonPressed);
    }
});