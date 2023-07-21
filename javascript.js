const numButtons = document.querySelectorAll(".buttons div .num");
const operatorButtons = document.querySelectorAll(".buttons div .operator");
const controlButtons = document.querySelectorAll(".buttons div .control");
const otherButtons = document.querySelectorAll(".buttons div .other");
const output = document.querySelector(".output");
let num1 = 0;
let operator = "";
let num2 = "";
let expressionReset = false;
let decimalPlaced = false;

window.addEventListener("keydown", keyHandler);

controlButtons.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.textContent === "AC") {
            clearOutput();
        } else if (button.textContent === "DEL") {
            deleteNum();
        }
    });
});

numButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addNum(button.textContent);
    });
});

operatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
        addOperator(button.textContent);
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

function clearOutput() {
    num1 = 0;            
    num2 = "";
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
    if (!output.textContent.includes(".")) decimalPlaced = false;
}

function deleteNum() {
    if (output.textContent.length <= 10) {
        let sliced = output.textContent.slice(0, -1);
        if (output.textContent.length > 1) {
            output.textContent = sliced;
        } else if (output.textContent.length === 1) {
            output.textContent = "0"
        }
    }
    if (!output.textContent.includes(".")) decimalPlaced = false;
}

function addNum(num) {
    if (output.textContent.length >= 10) {
        let max = output.textContent.substring(0, 10);
        output.textContent = max;
    }
    if (output.textContent === "0" || (operator !== "" && num2 === "") || expressionReset === true) {
        output.textContent = num;
    } else if (output.textContent !== "0" && output.textContent.length !== 10) {
        output.textContent += num;
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
}

function addOperator(op) {
    if (operator === "") {
        changeOp(op);
        operatorButtons.forEach((button) => {
            if (operator === button.textContent) {
                button.classList.remove("unselected");
                button.classList.add("selected");  
            } 
        });
        console.log(operator)
    } else if (operator !== "" && num2 !== "") {
        equal();
        changeOp(op);
        operatorButtons.forEach((button) => {
            if (operator === button.textContent) {
                button.classList.remove("unselected");
                button.classList.add("selected");  
            } 
        });
        console.log(operator)
    }
    decimalPlaced = true
}

function changeOp(op) {
    if (op === "*") {
        operator = "×"
    } else if (op === "/") {
        operator = "÷"
    } else {
        operator = op;
    }
}

function keyHandler(e) {
    if (e.key === "Escape") clearOutput();
    if (e.key === "Backspace") deleteNum();
    if (e.key >= 0 && e.key <= 9) addNum(e.key)
    if (e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/") addOperator(e.key);
    if (e.key === "=" || e.key === "Enter") equal();
    e.preventDefault()
}


function equal() {
    if (operator !== "" && num2 !== "") {
        if (operator === "÷" && (num1 === 0 || num2 === 0)) {
            output.textContent = "no"
        } else {
            output.textContent = operate(operator, +num1, +num2).toPrecision(10).replace(/\.?0+$/,"");
        }
        num1 = output.textContent;
        num2 = "";
        operator = "";
        expressionReset = true
        decimalPlaced = true;
    }
}

function operate(op, a, b) {
    if (op === "+") return +add(a, b);
    if (op === "-") return +subtract(a, b);
    if (op === "×") return +multiply(a, b);    
    if (op === "÷" && (a !== 0 || b !== 0)) return +divide(a, b);
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