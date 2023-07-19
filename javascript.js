const numButtons = document.querySelectorAll(".buttons div .num");
const operatorButtons = document.querySelectorAll(".buttons div .operator");
const controlButtons = document.querySelectorAll(".buttons div .control");
const otherButtons = document.querySelectorAll(".buttons div .other");
const output = document.querySelector(".output");
let num1 = 0;
let operator = "";
let num2 = 0;
let expressionReset = false;

controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            num1 = 0;            
            num2 = 0;
            operator = "";
            const operators = document.querySelectorAll(".buttons div .operator")
            operators.forEach((button) => {
                if (button.classList.contains("selected")) {
                    button.classList.remove("selected");
                    button.classList.add("unselected");
                } 
                });
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
            if (output.textContent === "0" || (operator !== "" && num2 === 0) || expressionReset === true) {
                output.textContent = button.textContent;
            } else if (output.textContent !== "0") {
                output.textContent += button.textContent;
            }  
        if (operator === "") {
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
        }}
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (operator === "") {
            operator = button.textContent;
            button.classList.remove("unselected");
            button.classList.add("selected");
            console.log(operator)
        } else if (operator !== "" && num2 !== 0) {
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
        if (button.classList.contains("equal") && operator !== "") equal();
    });
});

function equal() {
    output.textContent = operate(operator, +num1, +num2);
    num1 = output.textContent;
    num2 = 0;
    operator = "";
    expressionReset = true
}

function operate(op, a, b) {
    if (op === "/" && (a === 0 || b === 0)) return "no"
    if (op === "+") return +add(a, b).toFixed(6);
    if (op === "-") return +subtract(a, b).toFixed(6);
    if (op === "*") return +multiply(a, b).toFixed(6);    
    if (op === "/" && (a !== 0 || b !== 0)) return +divide(a, b).toFixed(6);
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