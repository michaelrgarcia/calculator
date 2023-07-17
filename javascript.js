let num1;
let operator;
let num2;
const output = document.querySelector(".output");
const calcButtons = document.querySelectorAll(".buttons div button");

calcButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") output.textContent = "0";
        if (output.textContent.length < 11) {
            if (button.textContent === "DEL" && output.textContent.length > 1) {
                let sliced = output.textContent.slice(0, -1);
                output.textContent = sliced;
            } else if (button.textContent === "DEL" && output.textContent.length === 1) {
                output.textContent = "0"
            }
            if (button.className === "operator") output.textContent += button.textContent;
            if (button.classList.contains("num") && output.textContent === "0") {
                output.textContent = button.textContent;
            } else if (button.classList.contains("num") && output.textContent !== "0") {
                output.textContent += button.textContent;
            }  
        }
    });
});

function operate(op, a, b) {
    if (op == "+") return add(a, b);
    if (op == "-") return subtract(a, b);
    if (op == "*") return multiply(a, b);
    if (op == "/") return divide(a, b);
}

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