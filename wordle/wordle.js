
let number = Number.parseInt(Math.random() * 20);

document.addEventListener("DOMContentLoaded", () => {

    createSquares();

    const startButton = document.getElementById("startButton");
    (async () => {
        disableButton(startButton);
        startButton.innerHTML = "Loading...";
        word = await getWordAndHint(number);
        startButton.innerHTML = "Start Over";
        enableButton(startButton);
    })()

    function createSquares() {
        const gameBoard = document.getElementById("board");
        for (let index = 0; index < 16; index++) {
            let square = document.createElement("div");
            square.classList.add("square");
            square.setAttribute("id", "box" + index);
            gameBoard.appendChild(square);
        }
        console.log("Grid Created");
    }
})

async function getWordAndHint(num) {
    let obj;
    const res = await fetch("https://api.masoudkf.com/v1/wordle", {
        headers: {
        "x-api-key": "sw0Tr2othT1AyTQtNDUE06LqMckbTiKWaVYhuirv",
        }
    });
    obj = await res.json();
    const wordAndHint = [obj.dictionary[num].word, obj.dictionary[num].hint];
    console.log("Word is: ", wordAndHint[0]);
    console.log("Hint is: ", wordAndHint[1]);
    let word = wordAndHint[0];
    document.getElementById("hint").innerHTML = "Hint: " + wordAndHint[1] + ".";
    return word;
}

const disableButton = (button1) => {
    button1.disabled = true;
};

const enableButton = (button1) => {
    button1.disabled = false;
};



const keyboard = document.querySelector(".keyboard");
const keys = [["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"], ["a", "s", "d", "f", "g", "h", "j", "k", "l"], ["Enter", "z", "x", "c", "v", "b", "n", "m", "<<<"]];


let rowIndex = 0;
let lineIndex = 0;
let currentWord = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
const boxes = [["box0","box1", "box2", "box3"], ["box4", "box5", "box6", "box7"], ["box8", "box9", "box10", "box11"], ["box12", "box13", "box14", "box15"]];

document.addEventListener("keyup", function(e){
    if (document.getElementById("board")) {
	    var pressedKey = e.key;
        handleClick(pressedKey)
        
    }
});
function hasClass(element, clsName) {
    return(' ' + element.className + ' ').indexOf(' ' + clsName + ' ') > -1;
}

function failed() {
    console.log("Failed Toggle");
    if (document.getElementsByClassName("showHint").length != 0) {
        hintToggle();
    }
    let failedBarContainer = document.getElementById("failedBarContainer");
    (async () => {
        word = await getWordAndHint(number);
        let failedBar = document.getElementById("failedBar");
        failedBar.innerHTML = "You missed the word <b>" + word + "</b> and lost!";
        failedBarContainer.classList.toggle("showFailedBar");
        failedBarContainer.setAttribute("id", "showFailedBarIsOn");
    })()
}

function startOver() {
    if (document.getElementById("showFailedBarIsOn")) {
        console.log("Start Over -- Failed")
        let failedBar = document.getElementById("showFailedBarIsOn");
        failedBar.classList.toggle("showFailedBar");
        failedBar.setAttribute("id", "failedBarContainer");
        const startButton = document.getElementById("startButton");
        number = Number.parseInt(Math.random() * 20);
        (async () => {
            disableButton(startButton);
            startButton.innerHTML = "Loading...";
            word = await getWordAndHint(number);
            startButton.innerHTML = "Start Over";
            enableButton(startButton);
        })()
    } else if (document.getElementById("board")) {
        console.log("Start Over -- Restart");
        const startButton = document.getElementById("startButton");
        number = Number.parseInt(Math.random() * 20);
        (async () => {
            disableButton(startButton);
            startButton.innerHTML = "Loading...";
            word = await getWordAndHint(number);
            startButton.innerHTML = "Start Over";
            enableButton(startButton);
        })()
    } else {
        console.log("Start Over -- Won")
        let winBar = document.getElementById("winBarContainer");
        winBar.classList.toggle("showWinBar");
        let winBoard = document.getElementById("hideBoard");
        winBoard.setAttribute("id", "board");
        let winHidden = document.getElementById("shownWin");
        winHidden.setAttribute("id", "hiddenWin");
        const startButton = document.getElementById("startButton");
        number = Number.parseInt(Math.random() * 20);
        (async () => {
            disableButton(startButton);
            startButton.innerHTML = "Loading...";
            word = await getWordAndHint(number);
            startButton.innerHTML = "Start Over";
            enableButton(startButton);
        })()
    }
    boxes.forEach(arrays => {
        arrays.forEach(element => {
            document.getElementById(element).innerHTML = "";
            document.getElementById(element).classList.remove("correctLocation");
            document.getElementById(element).classList.remove("correctChar");
            document.getElementById(element).classList.remove("incorrectChar");
            rowIndex = 0;
            lineIndex = 0;
            currentWord = [["", "", "", ""], ["", "", "", ""], ["", "", "", ""], ["", "", "", ""]];
        });
    });
    keys.forEach(keyset => {
        keyset.forEach(keyId => {
            document.getElementById(keyId).classList.remove("correctLocation");
            document.getElementById(keyId).classList.remove("correctChar");
            document.getElementById(keyId).classList.remove("incorrectChar");
        });
    });
    if (document.getElementsByClassName("showHint").length != 0) {
        hintToggle();
    }
}

function win() {
    console.log("Win Toggle");
    if (document.getElementsByClassName("showHint").length != 0) {
        hintToggle();
    }
    let winBarContainer = document.getElementById("winBarContainer");
    winBarContainer.classList.toggle("showWinBar");
    (async () => {
        word = await getWordAndHint(number);
        let winBar = document.getElementById("winBar");
        winBar.innerHTML = "You guesed the word <b>" + word + "</b> correctly!";
    })()

    let winBoard = document.getElementById("board");
    winBoard.setAttribute("id", "hideBoard");

    let winHidden = document.getElementById("hiddenWin");
    winHidden.setAttribute("id", "shownWin");
}


function themeToggle() {
    console.log("Dark-mode Toggle");
    let element = document.body;
    element.classList.toggle("dark-mode");
}

function hintToggle() {
    console.log("Hint Toggle");
    let element = document.getElementById("hintContainer");
    element.classList.toggle("showHint");
}

function infoToggle() {
    console.log("Info Toggle");
    let element = document.getElementById("infoContainer");
    element.classList.toggle("info-tab");
    if(document.getElementById("exist")){
        removeOld();
    } else {
        addNew();
    }
 }

 function removeOld() {
    var checkExist =  document.getElementById('exist');
    checkExist.remove();
 }

 function addNew() {
    const txtContainer = document.createElement("div");
    const infoDiv = document.getElementById("info");
    txtContainer.setAttribute("id", "exist");

    const h3 = document.createElement("h3");
    h3.setAttribute("id", "h3Style");
    const nodeh3 = document.createTextNode("How to Play");
    h3.appendChild(nodeh3);
    txtContainer.appendChild(h3);

    const ul = document.createElement("ul");
    addLiToUl("Start typing. The letters will appear in the boxes.", ul)
    addLiToUl("Remove letters whith Backspace.", ul)
    addLiToUl("Hit Enter/Return to submit an answer.", ul)
    addLiToUl("Letters with green background are in the right spot.", ul)
    addLiToUl("Letters with yellow background exist in the word, but are in the wrong spots.", ul)
    addLiToUl("Letters with gray background do not exits in the word.", ul)
    addLiToUl("If you need a hint, click the ? icon", ul)
    txtContainer.appendChild(ul);
    infoDiv.appendChild(txtContainer);
 }

 function addLiToUl(txt, ul) {
    const li = document.createElement("li")
    const nodeLi = document.createTextNode(txt);
    li.appendChild(nodeLi);
    li.setAttribute("id", "liStyle");
    ul.appendChild(li);
 }
const handleClick = (x) => {
    if (x.toLowerCase() != x.toUpperCase() && rowIndex != 4 && String(x).length == 1) {
        document.getElementById(boxes[lineIndex][rowIndex]).innerHTML = x.toLowerCase();
        if (rowIndex < 4) {
            currentWord[lineIndex][rowIndex] = x;
            rowIndex = rowIndex + 1;
        }
    }
    if (x == "Enter" && lineIndex < 4 && rowIndex != 4) {
        window.alert("You must first complete the word befor submiting your answer.")
    }
    if (x == "Enter" && lineIndex < 4 && rowIndex == 4) {
        rowIndex = 0;
        let greenCount = 0;
        console.log("");
        let greenKeys = [];
        let yellowKeys = [];
        for (let indexWord = 0; indexWord < 4; indexWord++) {
            let wordChar = word.toLowerCase()[indexWord];
            let check = true;
            console.log("");
            console.log("******************************");
            console.log("The letter " + wordChar + ".");
            console.log("******************************");
            console.log("");
            for (let indexText = 0; indexText < 4; indexText++) {
                let squareDiv = document.getElementById("box" + String(((lineIndex * 4) + indexText)));
                let text = squareDiv.textContent;
                let key = document.getElementById(text);
                console.log("");
                console.log("------------------------------");
                console.log("Looking for the letter " + wordChar + " in the GREEN for loop.");
                console.log("------------------------------");
                console.log("");
                console.log("Checking if wordChar " + wordChar + " is the same as " + text + ",");
                console.log("and that wordChar location " + indexWord + " is the same as text location " + indexText);
                if (indexText == indexWord && wordChar == text) {
                    console.log("Yes! " + wordChar + " == " + text + " and " + indexWord + " == " + indexText + ".");
                    console.log("");
                    squareDiv.classList.add("correctLocation");
                    greenKeys.push(wordChar);
                    key.classList.add("correctLocation");
                    greenCount = greenCount + 1;
                    check = false
                    break;
                } else {
                    console.log("No! " + wordChar + " != " + text + " and/or " + indexWord + " != " + indexText + ".");
                    console.log("");
                }
            }

            for (let indexText = 0; indexText < 4; indexText++) {
                let squareDiv = document.getElementById("box" + String(((lineIndex * 4) + indexText)));
                let text = squareDiv.textContent;
                let key = document.getElementById(text);
                if (check) {
                    console.log("");
                    console.log("------------------------------");
                    console.log("Looking for the letter " + wordChar + " in the YELLOW for loop.");
                    console.log("------------------------------");
                    console.log("");
                    console.log("Checking if wordChar " + wordChar + " is the same as " + text + ",");
                    console.log("and that " + hasClass(squareDiv, "correctLocation") + " and " + hasClass(squareDiv, "correcChar") + " are false.");
                    if (wordChar == text && hasClass(squareDiv, "correctLocation") == false && hasClass(squareDiv, "correcChar") == false) {
                        console.log("Yes! " + wordChar + " == " + text + " at indexWord " + indexWord + " and indexText " + indexText + ".");
                        console.log("");
                        squareDiv.classList.add("correctChar");
                        if (greenKeys.includes(wordChar) == false) {
                            yellowKeys.push(wordChar);
                            key.classList.add("correctChar");
                        }
                        break;
                    } else {
                        console.log("No! " + wordChar + " != " + text + " at indexWord " + indexWord + " and indexText " + indexText + ".");
                        console.log("");
                    }
                }
            }
        }
        console.log("");
        console.log("------------------------------");
        console.log("------------------------------");
        console.log("");
        for (let indexText = 0; indexText < 4; indexText++) {
            let squareDiv = document.getElementById("box" + String(((lineIndex * 4) + indexText)));
            let text = squareDiv.textContent;
            let key = document.getElementById(text);
            console.log("Checking if letter " + text + " in box " + indexText + " should be is gray.")
            if (greenKeys.includes(text) == false && yellowKeys.includes(text) == false ) {
                console.log("greenKeys: " + hasClass(squareDiv, "correctLocation") + " and yellowKeys: " + hasClass(squareDiv, "correcChar") + " should be false.");
                console.log("Yes! The letter " + text + " in box " + indexText + " is gray.")
                console.log("");
                squareDiv.classList.add("incorrectChar");
                key.classList.add("incorrectChar");
            } else {
                console.log("No! The letter " + text + " in box " + indexText + " is not gray.")
                console.log("");
            }
        }
        if (greenCount == 4) {
            win();
        }
        lineIndex = lineIndex + 1;
        if (greenCount != 4 && lineIndex == 4) {
            failed()
        }
    }
    if ((x == "Backspace" || x == "<<<") && rowIndex != 0) {
        rowIndex = rowIndex - 1;
        currentWord[lineIndex][rowIndex] = "";
        document.getElementById(boxes[lineIndex][rowIndex]).innerHTML = "";
    }
}
for (let index = 0; index < keys.length; index++) {
    const keyboardRow1Container = document.createElement("div");
    keyboardRow1Container.classList.add("keyboardRow1Container" + index);
    const buffer1 = document.createElement("div");
    buffer1.classList.add("buffer1");
    const buffer2 = document.createElement("div");
    buffer2.classList.add("buffer2");
    const keyboardRow = document.createElement("div");
    keyboardRow.classList.add("keyboardRow" + index);
    keys[index].forEach(key => {
        const buttonElement = document.createElement("button");
        buttonElement.textContent = key;
        buttonElement.setAttribute("id", key);
        buttonElement.addEventListener("click", () => handleClick(key));
        keyboardRow.append(buttonElement);
    });
    if (index == 1) {
        keyboardRow1Container.append(buffer1);
        keyboardRow1Container.append(keyboardRow);
        keyboardRow1Container.append(buffer2);
        keyboard.append(keyboardRow1Container);
    } else {
    keyboard.append(keyboardRow);
    }
}