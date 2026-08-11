console.log("JavaScript is working!");
function insertAtCursor(value){
    const position = display.selectionStart;

    display.value = display.value.slice(0,position) + value + 
    display.value.slice(position);

    display.focus();
    display.setSelectionRange(
        position + value.length,
        position + value.length);
}
function setDisplay(value){
    display.value = value;
    display.focus();
    display.setSelectionRange(
        display.value.length,
        display.value.length
    );
}

function addOperator(operator){
    if(display.value === "-" ){
        if(operator === '−' || operator === "(" ){
            setDisplay(operator);
            return;
        }
        setDisplay("Error");
        return;
    }
    insertAtCursor(operator);
}
function calculate(){
    const expression = 
        display.value
        .replaceAll("×","*")
        .replaceAll("÷","/")
        .replaceAll("−","-");

    try {

        setDisplay(eval(expression));

        } catch (error) {

        setDisplay("Error");
        }
}

function squareRoot(){
    if(display.value==="-"||display.value==="Error"){
        setDisplay("Error");
        return;
    }

    const number = Number(display.value);
    
    if(number<0||isNaN(number)){
        setDisplay("Error");
        return;
    }
    setDisplay(Math.sqrt(number));
}

function convertOperator(key){
    if(key === "*"){
        return "×";
    }
    else if(key === "/"){
        return "÷"
    }
    else if(key === "-"){
        return "−"
    }
    else {
        return key;
    }
}

function deleter(){
        const position = display.selectionStart;
        if(position === 0){
            return;
        }
        display.value = display.value.slice(0, position-1) +
        display.value.slice(position);

        display.focus();
        
        display.setSelectionRange(
            position - 1,
            position - 1);
}
const display = document.getElementById("display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const decimalButton = document.querySelector(".decimal"); 
const deleteButton = document.querySelector(".delete");
const rootButton = document.querySelector(".root");
const cursor = document.querySelector(".cursor");

numberButtons.forEach(function (button){
    button.addEventListener(
        "click",
        function(){
            if(display.value === "-" || display.value === "Error"){
                setDisplay(button.textContent);
            } else {
                insertAtCursor(button.textContent);
            }
        }
    );
});



operatorButtons.forEach(function (button){
    button.addEventListener(
        "click",
        function(){
            addOperator(button.textContent);
        }
    );
});

equalsButton.addEventListener("click", calculate);

clearButton.addEventListener(
    "click",
    function(){
            setDisplay("-");
        }
);

decimalButton.addEventListener(
   "click",
    function(){
            if(display.value === '-'){
                setDisplay("Error");
                return;
            }
            insertAtCursor(".");
        }
);

deleteButton.addEventListener("click",deleter);

rootButton.addEventListener("click",squareRoot);
// document.addEventListener("keydown", function (event) {
//     console.log(event.key);
// });

document.addEventListener("keydown", function (event) {

    if (event.key >= "0" && event.key <= "9") {
        event.preventDefault();

        if (display.value === "-" || display.value === "Error") {
            setDisplay(event.key);
        } else {
            insertAtCursor(event.key);
        }

    }

    else if ("+-*/()%".includes(event.key)) {
        event.preventDefault();
        const operator = convertOperator(event.key);
        addOperator(operator);
    }

    else if (event.key === "."){
        event.preventDefault();
        if(display.value === '-'){
                setDisplay("Error");
                return;
        }
        insertAtCursor(".");
    }
    else if (event.key === "Backspace"){
        event.preventDefault();
        deleter();
    }
    else if(event.key === "Enter"){
        event.preventDefault();
        calculate();
    }
    else if(event.key === "ArrowLeft"){
        event.preventDefault();
        const position = display.selectionStart;

        display.setSelectionRange(
            Math.max(0, position - 1),
            Math.max(0, position - 1));
    }
    else if(event.key === "ArrowLeft"){
        event.preventDefault();
        const position = display.selectionStart;

        display.setSelectionRange(
            Math.min(display.value.length, position + 1),
            Math.min(display.value.length, position + 1));
    }
});

