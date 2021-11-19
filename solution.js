function solve() {
    
    let tBody = document.querySelector('tbody');
    let quickCheckBtn = document.querySelector('#quickCheck');
    let sudookuMatrix = [];
    let sudokuUniqueSquareTrack = 1;
    let sudokuTrLenght = 9;
    let sudokuSquareRepeatingNums = [];

    createHtml();
    initialiseSudokuMatrix();

    quickCheckBtn.addEventListener('click', checkSudoku);
    document.querySelector('#easyMode').addEventListener('click', fillSudokuHTML);
    document.querySelector('#hardMode').addEventListener('click', fillSudokuHTML);
    document.querySelector('#testMode').addEventListener('click', fillSudokuHTML);
    document.querySelector('#loadSaveGame').addEventListener('click', fillSudokuHTML);
    document.querySelector('#saveProgress').addEventListener('click', saveGameProgress);

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
        } else if (buttonName === 'testMode') {
            return correctSudocuForTest;
        } else if (buttonName === 'loadSaveGame') {
            return JSON.parse(window.localStorage.getItem('sudokuProgress'));
        }
        return difficultSudokuMode;
    }

    function checkForDuplicates(array) {

         return new Set(array).size !== array.length;

    }

    function checkForDuplicatesInSquares(array) {

        let setArr = new Set(array);

        if (setArr.size !== array.length) {

            let counter = 0;

            for (let index = 0; index < array.length; index++) {
                const outerEl = array[index];
                
                for (let j = 0; j < array.length; j++) {
                    const innerEl = array[j];
                    if (outerEl == innerEl) {
                        counter ++;
                    }
                }
                if (counter >= 2) {
                    sudokuSquareRepeatingNums.push(outerEl);
                }
                counter = 0;
            }
                
            return true;
        }

        return false;
    }
    
    function createHtml() {

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
        createToastBootstrap();
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

                if (inputValue === "") {
                    sudookuMatrix[k][s] = 0;
                }
                sudookuMatrix[k][s] = Number(inputValue);
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

        hideButtons("disabled");
        
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
            const winMessage = "You Won!!! Sudoku riddle was solved."; 
            toastMessageExecute(winMessage);
            document.querySelector('#clear').disabled = "";
        }
        sudokuUniqueSquareTrack = 1;

    }

    function checkSudokuSquaresForUniquenes(startRowIndex, endRowIndex) {

        let isTrue = true;
        let arr = [];

        if (sudokuUniqueSquareTrack === 9) {
            sudokuUniqueSquareTrack = 1;
        }

        for (let a = 0; a < sudokuTrLenght; a++) {

            for (let b = startRowIndex; b <= endRowIndex; b++) {

                let element = sudookuMatrix[a][b];
                arr.push(element);

                if (b === endRowIndex) {
                    if (a === 2 || a === 5 || a === 8) {

                        if (checkForDuplicatesInSquares(arr)) {
                            searchRepeatingElementinSquares(startRowIndex, endRowIndex, a);
                            sudokuSquareRepeatingNums = [];
                            isTrue = false;
                        }
                        arr = [];
                        sudokuSquareRepeatingNums = [];
                        sudokuUniqueSquareTrack++;
                    }
                }
            }
        }
        return isTrue;
    }

    function checkRowsAndColsForUniquenes() {

        let isTrue = true;

        for (let z = 0; z < sudokuTrLenght; z++) {

            const rowarr = sudookuMatrix[z];

            if (checkForDuplicates(rowarr)) {
                enlightWrongRowOrCol(z,sudokuTrLenght, true);
                isTrue = false;
            }
            
             let colArr = [];

            for (let b = 0; b < sudokuTrLenght; b++) {

                let colEl = sudookuMatrix[b][z];
                colArr.push(colEl);

                if (b === sudokuTrLenght-1) {

                    if (checkForDuplicates(colArr)) {
                        enlightWrongRowOrCol(z,sudokuTrLenght, false);
                        isTrue = false;
                    }
                }
            }
        }
            return isTrue;
    }

    function searchRepeatingElementinSquares(startNum, endNum, startRow) {
        for (let a = startRow - 2; a <= startRow; a++) {
    
            for (let b = startNum; b <= endNum; b++) {
                
                const element = sudookuMatrix[a][b];
    
                if (sudokuSquareRepeatingNums.includes(element)) {
                    
                    enlightWrongBox(a, b);
                }
            }
        }
    
    }

    function removeColorBoxes(a, b, c){
        setTimeout(() => {
            tBody.querySelectorAll('tr')[`${a == undefined ? c : a}`].children[`${b == undefined ? c : b}`].firstChild.style = "";
             hideButtons("");
        }, 4200);
    }

    function hideButtons(hiddenOrNot){
        quickCheckBtn.disabled = hiddenOrNot;
        document.querySelector('#easyMode').disabled = hiddenOrNot;
        document.querySelector('#hardMode').disabled = hiddenOrNot;
        document.querySelector('#testMode').disabled = hiddenOrNot;
        document.querySelector('#loadSaveGame').disabled = hiddenOrNot;
        document.querySelector('#saveProgress').disabled = hiddenOrNot;
        document.querySelector('#clear').disabled = hiddenOrNot;
        
    }

    function colorWrongRowOrCol(a, b, c){
        for (let index = 0; index < c; index++) {
                 
            tBody.querySelectorAll('tr')[`${a == undefined ? index : a}`].children[`${b == undefined ? index : b}`].firstChild.style = "background-color:#5cd187;";
            removeColorBoxes(a, b, index);
        }
    }

    function enlightWrongRowOrCol(rowIndex,loopNums, rowTrueColFalse){

        if (rowTrueColFalse) {
            colorWrongRowOrCol(rowIndex, undefined, loopNums);
        } else{
            colorWrongRowOrCol(undefined, rowIndex, loopNums);
        }
    }

    function enlightWrongBox(rowIndex, colIndex) {

        tBody.querySelectorAll('tr')[rowIndex].children[colIndex].firstChild.style = "background-color:crimson;";
        removeColorBoxes(rowIndex, colIndex);
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
            const zeroesExistMessage = "Please Fill All Boxes. Zeroes are not allowed!\n";
            toastMessageExecute(zeroesExistMessage);
            return true;
        } else if (wrongNumExist) {
            const wrongNumMessage = "Only 1-9 Nums are alowed!!!";
            toastMessageExecute(wrongNumMessage);
            return true;
        }
        return false;
    }

    function toastMessageExecute(message){
        document.querySelector('.toast-body').innerText = message;
        let toast = new bootstrap.Toast(document.getElementById('liveToast'));
        toast.show();
    }

    function createToastBootstrap(){
        let toastBox = document.createElement('div');
        toastBox.classList = `toast align-items-center text-white bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true`;
        toastBox.id = "liveToast";
        toastBox.style ="outline: solid thin;";
        toastBox.innerHTML =
        `
            <div class="d-flex">
                <div class="toast-body">
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
      `;
        document.querySelector('#container').append(toastBox);
    }

    function saveGameProgress(){
        const toastSaveGameMessage = "Current SUDOKU Progress Saved";
        fillSudokuMatrix();
        let currentSudokuProgress = JSON.stringify(sudookuMatrix);
        window.localStorage.setItem('sudokuProgress', currentSudokuProgress);
        toastMessageExecute(toastSaveGameMessage);
    }
    
}