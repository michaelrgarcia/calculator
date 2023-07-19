const numButtons = document.querySelectorAll(".buttons div .num");
const operatorButtons = document.querySelectorAll(".buttons div .operator");
const controlButtons = document.querySelectorAll(".buttons div .control");
const otherButtons = document.querySelectorAll(".buttons div .other");
const output = document.querySelector(".output");
let num1 = 0;
let operator = null;
let num2 = 0;
let expressionReset = false;

controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            num1 = 0;            
            num2 = 0;
            operator = null;
            output.textContent = "0";
        } else if (button.textContent === "DEL" && output.textContent.length < 11) {
            let sliced = output.textContent.slice(0, -1);
            if (output.textContent.length > 1) {
                output.textContent = sliced;
            } else if (output.textContent.length === 1) {
                output.textContent = "0"
            }
        }
    });
});

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (output.textContent.length < 11) {
            if (output.textContent === "0" || (operator !== null && num2 === 0) || expressionReset === true) {
                output.textContent = button.textContent;
            } else if (output.textContent !== "0") {
                output.textContent += button.textContent;
            }  
        if (operator === null) {
            num1 = output.textContent
            console.log(num1);
            expressionReset = false;
        } else {
            const operators = document.querySelectorAll(".buttons div .operator")
            operators.forEach((button) => {
            if (button.classList.contains("selected")) {
                button.classList.remove("selected");
                button.classList.add("unselected");
            } 
            });
            num2 = output.textContent;
            console.log(num2);
            expressionReset = false;
        }
        }
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operator === null) {
            operator = button.textContent;
            button.classList.remove("unselected");
            button.classList.add("selected");
            console.log(operator)
        } else if (operator !== null && num2 !== 0) {
            equal();
            operator = button.textContent;
            button.classList.remove("unselected");
            button.classList.add("selected");
            console.log(operator)
        }
    });
});

otherButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("equal") && operator !== null) equal();
    });
});

function equal() {
    output.textContent = +operate(operator, +num1, +num2).toFixed(6);
    num1 = output.textContent;
    num2 = 0;
    operator = null;
    expressionReset = true
}

function operate(op, a, b) {
    if (op === "/" && a === 0 && b === 0) return "no";
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