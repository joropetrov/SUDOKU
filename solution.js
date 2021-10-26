function solve() {


    let tBody = document.querySelector('tbody');
    let easyMode = document.querySelector('#easyMode');
    let hardMode = document.querySelector('#hardMode');
    let quickCheckBtn = document.querySelector('#quickCheck');
    let wrongAnswerOrNum = false;
    let sudookuMatrix = [];
    let sudokuUniqueSquareTrack = 1;
    let sudokuTrLenght = 9;

    createHtmlTables();
    initialiseSudokuMatrix();

    quickCheckBtn.addEventListener('click', checkSudoku);

    easyMode.addEventListener('click', fillSudokuHTML);
    
    hardMode.addEventListener('click', fillSudokuHTML);

    function sudokuMode(buttonName) {
        
        let easySudokuObj = {

            '0': [3, 4, 0, 7, 0, 6, 0, 0, 1],
            '1': [8, 7, 0, 0, 0, 0, 9, 0, 6],
            '2': [0, 0, 0, 8, 9, 1, 0, 0, 3],
            '3': [0, 0, 0, 0, 0, 3, 5, 6, 8],
            '4': [6, 8, 0, 0, 5, 4, 0, 0, 0],
            '5': [9, 1, 0, 6, 0, 0, 0, 0, 0],
            '6': [0, 3, 0, 4, 0, 0, 0, 8, 0],
            '7': [5, 9, 0, 0, 0, 0, 7, 3, 0],
            '8': [7, 0, 0, 5, 3, 8, 0, 1, 9]
        };

        let difficultSudokuMode = {
            '0': [0, 0, 0, 0, 0, 1, 2, 3, 0],
            '1': [0, 0, 0, 0, 0, 0, 4, 5, 6],
            '2': [0, 4, 6, 7, 0, 0, 0, 0, 0],
            '3': [0, 5, 8, 9, 0, 0, 0, 0, 0],
            '4': [0, 0, 0, 0, 0, 0, 0, 0, 0],
            '5': [0, 0, 0, 0, 0, 6, 4, 2, 0],
            '6': [0, 0, 0, 0, 0, 2, 1, 8, 0],
            '7': [0, 8, 2, 3, 0, 0, 0, 0, 0],
            '8': [0, 7, 3, 6, 0, 0, 0, 0, 0]
        };

        // for test purposes, return  correntSudocu to check functionality
        let correctSudocuForTest = {
            '0': [1, 6, 8, 5, 4, 7, 2, 3, 9],
            '1': [5, 7, 9, 3, 6, 2, 8, 1, 4],
            '2': [3, 2, 4, 1, 8, 9, 5, 6, 7],
            '3': [7, 3, 5, 4, 2, 6, 9, 8, 1],
            '4': [9, 8, 2, 7, 5, 1, 6, 4, 3],
            '5': [6, 4, 1, 8, 9, 3, 7, 5, 2],
            '6': [8, 1, 7, 2, 3, 5, 4, 9, 6],
            '7': [4, 9, 3, 6, 7, 8, 1, 2, 5],
            '8': [2, 5, 6, 9, 1, 4, 3, 7, 8]
        };
        
        if (buttonName === 'easyMode') {
            return easySudokuObj;
        }

        return difficultSudokuMode;
    }

    function checkForDuplicates(array) {
        return new Set(array).size !== array.length;
    }

    function createHtmlTables() {

        for (let index = 0; index < sudokuTrLenght; index++) {

            let tr = document.createElement('tr');
            tr.id = index;

            for (let j = 0; j < sudokuTrLenght; j++) {
                let td = document.createElement('td');
                let input = document.createElement('input');
                input.type = "number";
                td.id = j;
                if (j == 2 || j == 5 || j == 8) {
                    td.style.borderRight = 'solid';
                }
                if (index == 2 || index == 5 || index == 8) {
                    td.style.borderBottom = 'solid';
                }
                td.appendChild(input);
                tr.appendChild(td);
            }
            tBody.appendChild(tr);
        }


    }

    function initialiseSudokuMatrix() {

        for (var i = 0; i < sudokuTrLenght; i++) {
            sudookuMatrix[i] = [0];
            for (var j = 0; j < sudokuTrLenght; j++) {
                sudookuMatrix[i][j] = 0;
            }
        }
    }

    function fillSudokuMatrix() {

        let tableRows = document.querySelectorAll('tbody tr');

        for (let k = 0; k < tableRows.length; k++) {

            for (let s = 0; s < tableRows.length; s++) {

                let inputValue = tableRows[k].children[s].firstChild.value;

                if (inputValue !== '') {
                    sudookuMatrix[k][s] = Number(inputValue);
                }
            }
        }
    }

    function fillSudokuHTML() {
        let inputFields = document.querySelectorAll('input');
        
        for (let index = 0; index < inputFields.length; index++) {
            inputFields[index].value = '';
        }

        let tableRows = document.querySelectorAll('tbody tr');
        let buttonName = event.target.id;
        let sudokuMode1 = sudokuMode(buttonName);

        for (let k = 0; k < tableRows.length; k++) {

            for (let s = 0; s < tableRows.length; s++) {

                let currElement = sudokuMode1[k][s];

                if (currElement !== 0) {
                    tableRows[k].children[s].firstChild.value = currElement;
                }
            }
        }
    }

    function checkSudoku() {

        wrongAnswerOrNum = false;

        fillSudokuMatrix();
        checkForZeroAndWrongNums(sudookuMatrix);

        if (wrongAnswerOrNum) {

            return;
        }

        checkRowsAndColsForUniquenes();
        checkSudokuSquaresForUniquenes(0, 2);
        checkSudokuSquaresForUniquenes(3, 5);
        checkSudokuSquaresForUniquenes(6, 8);
        
        if (document.querySelectorAll('tfoot tr').length == 2) {
            let winMessage = "You Won!!! Sudoku riddle was solved.";
           alertMessageFunc(winMessage);
        }
    }

    function checkSudokuSquaresForUniquenes(numberOne, numberTwo) {

        let arr = [];

        if (sudokuUniqueSquareTrack >= 9) {
            sudokuUniqueSquareTrack = 1;
        }

        for (let a = 0; a < sudokuTrLenght; a++) {

            for (let b = numberOne; b <= numberTwo; b++) {

                let element = sudookuMatrix[a][b];
                arr.push(element);

                if (b === numberTwo) {
                    if (a === 2 || a === 5 || a === 8) {

                        if (checkForDuplicates(arr)) {
                            message = `Repeating Numbers in Inner Square Number ${sudokuUniqueSquareTrack}!!!`;
                            alertMessageFunc(message);
                        }
                        arr = [];
                        sudokuUniqueSquareTrack++;
                    }
                }
            }
        }
    }

    function checkRowsAndColsForUniquenes() {

        let rowarr = [];
        let colArr = [];
        let message;

        for (let z = 0; z < sudokuTrLenght; z++) {

            rowarr = sudookuMatrix[z];

            if (checkForDuplicates(rowarr)) {
                message = `Row Number ${z + 1} is not with unique numbers`;
                alertMessageFunc(message);
                return;
            }
            rowarr = [];
            colArr = [];

            for (let b = 0; b < sudokuTrLenght; b++) {

                let colEl = sudookuMatrix[b][z];
                colArr.push(colEl);

                if (b === 8) {

                    if (checkForDuplicates(colArr)) {
                        message = `Column Number ${z + 1} is not with unique numbers`;
                        alertMessageFunc(message);
                        return;
                    }
                }
            }
        }
    }

    function enlightWrongBox(numOne, numTwo) {

        tBody.querySelectorAll('tr')[numOne].children[numTwo].firstChild.style = "background-color:red";

        setTimeout(() => {
            tBody.querySelectorAll('tr')[numOne].children[numTwo].firstChild.style = "";

        }, 3800);
    }

    function alertMessageFunc(strMessage) {

        let alertMessage = document.createElement('th');
        let tr = document.createElement('tr');
        let time = 9;

        alertMessage.colSpan = "9";
        alertMessage.innerHTML = typeof strMessage === "undefined" ? `Please Fill All Boxes. Zeroes are not allowed!\n
        Message dissapears in ${time}sec.` : `${strMessage} Message dissapears in ${time}sec.`;
        alertMessage.style = "background-color:red;";
        tr.appendChild(alertMessage);
        document.querySelector('tfoot').prepend(tr);
       
        setTimeout(() => {
           
            document.querySelector('tfoot').removeChild(tr);
        }, 10000);

        setInterval(()=>{
            timer();
        }, 1000)

        function timer(){
            time-= 1;
            alertMessage.innerHTML = typeof strMessage === "undefined" ? `Please Fill All Boxes. Zeroes are not allowed!\n
            Message dissapears in ${time}sec.` : `${strMessage} Message dissapears in ${time}sec.`;
        }
    }

    function checkForZeroAndWrongNums(nestedArray) {

        let allowedArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        let wrongNumMessage = "Only 1-9 Nums are alowed!!!";
        let wrongNumExist = false;
        let zeroesExist = false

        for (let v = 0; v < sudokuTrLenght; v++) {

            for (let c = 0; c < sudokuTrLenght; c++) {

                let tempValue = nestedArray[v][c];
                let numOne = v;
                let numTwo = c;

                if (tempValue == 0) {
                    enlightWrongBox(numOne, numTwo);
                    zeroesExist = true;
                }

                if (!allowedArr.includes(tempValue) || typeof tempValue === 'string') {
                    enlightWrongBox(numOne, numTwo);
                    wrongNumExist = true;
                }
            }
        }

        if (zeroesExist) {
            wrongAnswerOrNum = true;
            alertMessageFunc();
            return;
        } else if (wrongNumExist) {
            wrongAnswerOrNum = true;
            alertMessageFunc(wrongNumMessage);
            return;
        }
    }

}