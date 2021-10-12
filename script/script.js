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
let operator = "";
const numberKeys = document.querySelectorAll(".num-key");
const actionKeys = document.querySelectorAll(".action-key");

function keyPress(event){
    let keyCode = event.keyCode;
    if(keyCode === 13){
        keyCode = 61;
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
    }else{
        alert ("pressed operator");
    }
};

function refreshDisplay(){
    document.querySelector("#calculator-display").textContent=currNum;
}