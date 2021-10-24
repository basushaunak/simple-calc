/* Project created by Shaunak Basu (@shaunakhub on GitHub) for Assignment task
   in The Odin Project */

/* Application Version. Change this if you update the app displayed on top of the frame*/
const appVersion = "0.1";
document.querySelector("#prod-info").textContent = `SimpleCalc v ${appVersion}`;


window.addEventListener("click", mouseClick);
window.addEventListener("keydown", keyPress);

let numArray = [];
let numArrayIdx = 0;
let tmpNumArray = [];
let lastNum = "";
let currNum = "";
let lastKey = "";
let lastOperator = "";
let operator = "";
let memoryNum = "";
const numberKeys = document.querySelectorAll(".num-key");
const actionKeys = document.querySelectorAll(".action-key");

function keyPress(event){
    let keyCode = event.keyCode;
    if(keyCode === 13){
        keyCode = 61;
    }
    if(keyCode === 27){
        initCalculator();
        refreshDisplay();
        return;
    }
    let btnPressed = document.querySelector(`button[data-key="${keyCode}"]`);
    if(!btnPressed){
        return;
    }
    console.log(btnPressed);
    btnPressed.click();
};

function mouseClick(event){
    if(!(event.target.tagName === "BUTTON")){
        return;
    }
    let currentButton = event.target.textContent;
    if(event.target.classList.contains("num-key")){        
        if(tmpNumArray.some(item => (item === ".")) && currentButton === "."){
            return;
        }
        tmpNumArray.push(currentButton);
        currNum = tmpNumArray.join("");
        refreshDisplay();
    }else if(event.target.classList.contains("action-key")){
        switch(currentButton){
            case "-":
                lastOperator=operator;
                operator = "-";
                break;
            case "+":
                lastOperator=operator;
                operator = "+";
                break;
            case "÷":
                lastOperator=operator;
                operator = "÷";
                break;
            case "X":
                lastOperator=operator;
                operator = "X";
                break;
            case "=" :
                lastOperator=operator;
                operator = "=";
                break;
            default:
                console.log("Logic Problem. Should not be here!");
                console.log("Button Pressed (action-key): " + currentButton);
                break;
            }
            markOperator(operator);
            if(lastNum === ""){
                lastNum = currNum;
                currNum = 0;
                tmpNumArray = [];
                refreshDisplay();
            } else{
                currNum = getResult(lastNum, currNum, lastOperator);
                lastOperator = operator === "=" ? "": operator;
                lastNum = "";
                tmpNumArray=[];    
                refreshDisplay();
            }        
        } else {
            switch(currentButton){
                case "MR":
                    currNum=memoryNum;
                    refreshDisplay();
                    break;
                case "M+":
                    memoryNum = currNum;
                    break;
                case "M-":
                    memoryNum = getResult(memoryNum, currNum, "-");
                    break;
                case "AC":
                    initCalculator();
                    refreshDisplay();
                    break;
                default:
                    console.log("Logic Problem. Should not be here!");
                    console.log("Button Pressed (spl-key): " +currentButton);
            }
        };
    }

function markOperator(ops){
    let tmpArray = Array.from(actionKeys);
    tmpArray.forEach(item =>{
        if(item.textContent === ops){
            item.style.color = "#FF0000";
        } else {
            item.style.color = "#FFFFFF";
        }
        
    })
}

function refreshDisplay(){
    document.querySelector("#calculator-display").textContent=currNum;
}

function initCalculator(){
    numArray = [];
    numArrayIdx = 0;
    tmpNumArray = [];
    lastNum = "";
    currNum = "";
    lastKey = "";
    lastOperator = "";
    operator = "";
    memoryNum = "";
}
// Need to work on negative numbers, i.e. 10 X (-) 5 
// and pressing of two operators (except +/-)

function getResult(num1, num2, operator){
    let result = 0;
    switch (operator){
        case "-":
            result = (+num1) - (+num2);
            break;
        case "÷":
            result = (+num1) / (+num2)
            break;
        case "+":
            result = (+num1) + (+num2)
            break;
        case "X":
            result = (+num1) * (+num2)
            break;
        default:
            console.log("Logic Problem. LastOperator is not valid");
            console.log("Last Operator: "+lastOperator);
            return NaN;
    }
    return ("" + result);
}