const displayText = document.querySelector(".displayText");
let inputExpression = [];
const OPERATORS = "+-/x"
const NUMBERS = "0123456789."
let isAnswerDisplayed = true;

// basic mathematical functions
function add(a,b){
    return a + b;
}

function subtract(a,b){
    return a - b;
}

function multiply(a,b){
    return a * b;
}

function divide(a,b){
    return a / b;
}

// function to operate 2 numbers
function operate(firstNumber, secondNumber, operator){
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);

    if (operator == '+'){
        return add(firstNumber, secondNumber);
    } else if (operator == '-'){
        return subtract(firstNumber, secondNumber);
    } else if (operator == 'x'){
        return multiply(firstNumber, secondNumber);
    } else if (operator == '/'){
        return divide(firstNumber, secondNumber);
    }
}

// function to display number inputs
function displayInput(input){
    if(isAnswerDisplayed){
        displayText.textContent = input;
        isAnswerDisplayed = false;
    } else {
        displayText.textContent = displayText.textContent + input;
    } 
}

// function to clear display
function clearDisplay(){
    displayText.textContent = "0";
    isAnswerDisplayed = true;
}

// function to evaluate an expression, invoked on clicking =
function evaluateExpression(inputExpression){
    let firstNumber = "";
    let secondNumber = "";
    let operator = "";
    let operatorFound = false;
    
    for (let i = 0; i < inputExpression.length; i++){
        let element = inputExpression[i];

        if (!isNaN(element)){
            if (!operatorFound){
                firstNumber = firstNumber + element;
            } else {
                secondNumber = secondNumber + element;
            }
        } else if (OPERATORS.includes(element)){
            if (!operatorFound){
                operator = element;
                operatorFound = true;
            } else {
                firstNumber = operate(firstNumber, secondNumber, operator);
                operator = element;
                secondNumber = ""
            }
        }
    }

    return operate(firstNumber, secondNumber, operator);
}

// When clear is clicked, clear the display & clear inputExpression
const clearKey = document.querySelector(".key.clear");

clearKey.addEventListener("click", function(){
    clearDisplay();
    inputExpression = [];
    console.log(inputExpression)
})

// When a number is clicked, add it to the display and add it to the inputExpression
const numberKeys = document.querySelectorAll(".key.number");

numberKeys.forEach((inputNumber) => {
    inputNumber.addEventListener("click", function(){
        let number = this.textContent;
        
        // add number to inputExpression
        if (isAnswerDisplayed){
            inputExpression = [];
        }
        inputExpression.push(number);
        console.log(inputExpression);

        // display the number - in case there is an operator currently, clean the screen first
        if (OPERATORS.includes(displayText.textContent)) {
            clearDisplay();
        }
        displayInput(number);
    })
});

// When a operator is clicked, clear and add it to the display, and add it to inputExpression.

const operatorKeys = document.querySelectorAll(".key.operator");

operatorKeys.forEach((operatorKey) => {
    operatorKey.addEventListener("click", function(){
        console.log("operator clicked")

        // Throw an error in case an operator already exists in the screen
        if (OPERATORS.includes(displayText.textContent)){
            alert("You cannot put 2 operators together")
            clearDisplay();
            inputExpression = []
        }
        
        // initialise operator
        let operator = this.textContent;
        
        // Add the operator to the inputExpression
        inputExpression.push(operator);
        console.log('inputExpression');
        
        // Clear display & show the operator on the screen
        clearDisplay();
        displayInput(operator);
    })
});

// When evaluate is clicked, evaluate the function, clear the display and display the answer

const evaluateKey = document.querySelector(".key.evaluate");

evaluateKey.addEventListener("click", function(){
    // Evaluate function
    let answer = evaluateExpression(inputExpression);

    // Clear the display and show answer
    clearDisplay();
    displayInput(answer);
    inputExpression = [answer + ""];
    isAnswerDisplayed = true;
})