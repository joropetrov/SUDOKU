function solve() {
    
    const winMessage = "You Won!!! Sudoku riddle was solved."; 
    const wrongNumMessage = "Only 1-9 Nums are alowed!!!";
    let tBody = document.querySelector('tbody');
    let easyMode = document.querySelector('#easyMode');
    let hardMode = document.querySelector('#hardMode');
    let quickCheckBtn = document.querySelector('#quickCheck');
    let wrongAnswerOrNum = false;
    let sudookuMatrix = [];
    let sudokuUniqueSquareTrack = 1;
    let sudokuTrLenght = 9;
    let sudokuSquareRepeatingNums = [];

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
            return correctSudocuForTest;
        if (buttonName === 'easyMode') {
            return easySudokuObj;
        }

        return difficultSudokuMode;
    }

    function checkForDuplicates(array) {

        let checkArr = [1,2,3,4,5,6,7,8,9];
        let setArr = new Set(array);

        if (setArr.size !== array.length) {
            checkArr.map(x => {
                if(!setArr.has(x)){
                    sudokuSquareRepeatingNums.push(x);
                }});
            return true;
        }

        return false;
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

        if ( checkForZeroAndWrongNums(sudookuMatrix)) {
            return;
        }
       
        let firstWinCondition = checkRowsAndColsForUniquenes();
        let secondWinCondition = checkSudokuSquaresForUniquenes(0, 2); // Innersquares 1-3
        let thirdWinCondition = checkSudokuSquaresForUniquenes(3, 5); // Innersquares 4-6
        let fourthWiCondition = checkSudokuSquaresForUniquenes(6, 8); // Innersquares 7-9

        if (firstWinCondition && secondWinCondition &&
            thirdWinCondition && fourthWiCondition) {
            alertMessageFunc(winMessage);
            sudokuUniqueSquareTrack = 1;
        }
    }

    function checkSudokuSquaresForUniquenes(startRowIndex, endRowIndex) {

        let arr = [];

        for (let a = 0; a < sudokuTrLenght; a++) {

            for (let b = startRowIndex; b <= endRowIndex; b++) {

                let element = sudookuMatrix[a][b];
                arr.push(element);

                if (b === endRowIndex) {
                    if (a === 2 || a === 5 || a === 8) {

                        if (checkForDuplicates(arr)) {
                            message = `Repeating Numbers in Inner Square Number ${sudokuUniqueSquareTrack}!!!`;
                            sudokuUniqueSquareTrack = 1;
                            alertMessageFunc(message);
                            //fix issue with searchRepeatingElinSquares, take coordinates of innerSquare only
                            searchRepeatingElinSquares(startRowIndex, endRowIndex);
                            return false;
                        }
                        arr = [];
                        sudokuSquareRepeatingNums = [];
                        sudokuUniqueSquareTrack++;
                    }
                }
            }
        }
        return true;
    }

    function checkRowsAndColsForUniquenes() {

        let message;

        for (let z = 0; z < sudokuTrLenght; z++) {

            const rowarr = sudookuMatrix[z];

            if (checkForDuplicates(rowarr)) {
                message = `Row Number ${z + 1} is not with unique numbers`;
                alertMessageFunc(message);
                return false;
            }
            
             let colArr = [];

            for (let b = 0; b < sudokuTrLenght; b++) {

                let colEl = sudookuMatrix[b][z];
                colArr.push(colEl);

                if (b === sudokuTrLenght-1) {

                    if (checkForDuplicates(colArr)) {
                        message = `Column Number ${z + 1} is not with unique numbers`;
                        alertMessageFunc(message);
                        return false;
                    }
                }
            }
        }
            return true;
    }

     // make rotation only for the specifiiq Quadrant, like 6 or so
    function searchRepeatingElementinSquares(startNum, endNum) {
        for (let a = 0; a < sudokuTrLenght; a++) {
    
            for (let b = startNum; b <= endNum; b++) {
                
                const element = sudookuMatrix[a][b];
    
                if (sudokuSquareRepeatingNums.includes(element)) {
                    console.log(element)
                    enlightWrongBox(a, b);
                }
            }
        }
    
    }

    function enlightWrongBox(rowIndex, colIndex) {

        tBody.querySelectorAll('tr')[rowIndex].children[colIndex].firstChild.style = "background-color:crimson";

        setTimeout(() => {
            tBody.querySelectorAll('tr')[rowIndex].children[colIndex].firstChild.style = "";

        }, 3800);
    }

    function alertMessageFunc(strMessage) {

        let alertMessage = document.createElement('th');
        let tr = document.createElement('tr');
        let time = 9;

        alertMessage.colSpan = "9";
        alertMessage.innerHTML = typeof strMessage === "undefined" ? `Please Fill All Boxes. Zeroes are not allowed!\n
        Message dissapears in ${time}sec.` : `${strMessage} Message dissapears in ${time}sec.`;
        tr.style="outline: thin solid";
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
       
        let wrongNumExist = false;
        let zeroesExist = false

        for (let v = 0; v < sudokuTrLenght; v++) {

            for (let c = 0; c < sudokuTrLenght; c++) {

                let tempValue = nestedArray[v][c];
                let rowIndex = v;
                let colIndex = c;

                if (tempValue == 0) {
                    enlightWrongBox(rowIndex, colIndex);
                    zeroesExist = true;
                } else if (!allowedArr.includes(tempValue) || typeof tempValue === 'string') {
                    enlightWrongBox(rowIndex, colIndex);
                    wrongNumExist = true;
                }
            }
        }
 
        if (zeroesExist) {
            alertMessageFunc();
            return true;
        } else if (wrongNumExist) {
            alertMessageFunc(wrongNumMessage);
            return true;
        }
        return false;
    }
}