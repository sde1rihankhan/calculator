let previousOperand = document.getElementById("previous-operand");
let currentOperand = document.getElementById("current-operand");
let buttons = document.querySelectorAll("button")

let firstOperand = ""
let secondOperand = ""
let currentOperator = ""
let resultShown = false


buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
       
        let action = button.dataset.action;
        let number = button.dataset.number;
        let operator = button.dataset.operator;

        if(action === "number"){
            handleNumber(number);

        }else if (action === "operator"){
            handleOperator(operator);

        }else if (action === "decimal") {
            handleDecimal();

        }else if (action === "clear") {
            clearAll();

        }else if (action === "delete") {
            deleteList();

        }else if (action === "equals") {
            calculatorResult();

        }else if (action === "percent") {
            applyPercent();
        }
    })
})

function handleNumber(num){
    if(resultShown){
        firstOperand = num;
        resultShown = false
    } else {
        if(!currentOperator){
            firstOperand += num;
    } else {
        secondOperand += num;
    }
    }
    updateDisplay()
}

function handleOperator(op){
    if (firstOperand === "") return;
    if ( secondOperand !== "" ){
        calculatorResult()
    }
    currentOperator = op;
    resultShown = false;
    updateDisplay();
}

function deleteList(){
    if(resultShown) return;

    if (secondOperand) {
        secondOperand = secondOperand.slice(0,-1)
    }else if (currentOperator) {
        currentOperator = ""
    }else if (firstOperand) {
        firstOperand = firstOperand.slice(0,-1)
    }
    updateDisplay()
}

function clearAll(){
    firstOperand = ""
    currentOperator = ""
    secondOperand = ""
    resultShown = false
    previousOperand.innerHTML = ""
    currentOperand.innerHTML = "0"
}

function handleDecimal(){
    if(!currentOperator){
        if(!firstOperand.includes(".")){
            firstOperand += firstOperand === "" ? "0." : ".";
    }
        }else{
            if(!secondOperand.includes(".")){
                secondOperand += secondOperand === "" ? "0." : ".";
            }
        }
    updateDisplay()
}

function calculatorResult(){
    if (firstOperand && secondOperand && currentOperator) {
        let a = parseFloat(firstOperand)
        let b = parseFloat(secondOperand)
        let result;
       
        if (currentOperator === "+") {
            result = a + b
        }else if (currentOperator === "-"){
            result = a - b
        }else if (currentOperator === "×"){
            result = a * b
        }else if (currentOperator === "÷"){
            result = (a / b).toFixed(2);
        }else{
            result = "Error"
        }
        previousOperand.innerHTML = `${firstOperand} ${currentOperator} ${secondOperand} = ${result}`
        currentOperand.innerHTML = "0"
        firstOperand = result.toString()
        secondOperand = ""
        currentOperator = ""
        resultShown = true
    }
}

function applyPercent(){
    if (!currentOperator && firstOperand) {
        firstOperand = (parseFloat(firstOperand) / 100).toString()
    }else if (secondOperand){
        secondOperand = (parseFloat(secondOperand) / 100).toString()
    }
    updateDisplay()
}

function updateDisplay(){
    if(currentOperator && secondOperand){
        currentOperand.innerHTML = `${firstOperand} ${currentOperator} ${secondOperand}`
    } else if(currentOperator){
        currentOperand.innerHTML = `${firstOperand} ${currentOperator}`
    } else {
        currentOperand.innerHTML = firstOperand || "0";
    }
}