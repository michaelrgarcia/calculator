const numButtons = document.querySelectorAll(".buttons div .num");
const operatorButtons = document.querySelectorAll(".buttons div .operator");
const controlButtons = document.querySelectorAll(".buttons div .control");
const otherButtons = document.querySelectorAll(".buttons div .other");
const output = document.querySelector(".output");
let num1 = 0;
let operator = "";
let num2 = 0;
let expressionReset = false;
let decimalPlaced = false;


controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            num1 = 0;            
            num2 = 0;
            operator = "";
            decimalPlaced = false;
            const operators = document.querySelectorAll(".buttons div .operator")
            operators.forEach((button) => {
                if (button.classList.contains("selected")) {
                    button.classList.remove("selected");
                    button.classList.add("unselected");
                } 
            });
            output.textContent = "0";
        } else if (button.textContent === "DEL" && output.textContent.length <= 10) {
            let sliced = output.textContent.slice(0, -1);
            if (output.textContent.length > 1) {
                output.textContent = sliced;
            } else if (output.textContent.length === 1) {
                output.textContent = "0"
            }
        }
        if (!output.textContent.includes(".")) decimalPlaced = false;
    });
});

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (output.textContent.length >= 10) {
            let max = output.textContent.substring(0, 10);
            output.textContent = max;
        }
        if (output.textContent === "0" || (operator !== "" && num2 === 0) || expressionReset === true) {
            output.textContent = button.textContent;
        } else if (output.textContent !== "0" && output.textContent.length !== 10) {
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
                decimalPlaced = false;
            }});
            num2 = output.textContent;
            console.log(num2);
            expressionReset = false;
        }
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
        decimalPlaced = true
    });
});

otherButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.classList.contains("equal") && operator !== "") equal();
        if (button.classList.contains("decimal") && output.textContent.length >= 1) {
            if (decimalPlaced === false || (decimalPlaced === false && operator !== "")) {
                output.textContent += button.textContent;
                decimalPlaced = true;
            }
        }
    });
});


function equal() {
    if (operator === "/" && (num1 === 0 || num2 === 0)) {
        output.textContent = "no"
    } else {
        output.textContent = operate(operator, +num1, +num2).toPrecision(10);
    }
    num1 = output.textContent;
    num2 = 0;
    operator = "";
    expressionReset = true
    decimalPlaced = true;
}

function operate(op, a, b) {
    if (op === "+") return +add(a, b);
    if (op === "-") return +subtract(a, b);
    if (op === "*") return +multiply(a, b);    
    if (op === "/" && (a !== 0 || b !== 0)) return +divide(a, b);
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