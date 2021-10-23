function solve() {

    let sudokuTrLenght = 9;
    let tBody = document.querySelector('tbody');
    let sudookuMatrix = [];
    let quickCheckBtn = document.querySelector('#quickCheck');

    createHtmlTables();
    initialiseSudokuMatrix();

    quickCheckBtn.addEventListener('click', checkSudoku);




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

    function checkSudoku() {

        fillSudokuMatrix();
        console.log(sudookuMatrix);
        checkForZeroAndWrongNums(sudookuMatrix);
        //check if sudoku contains 0 --> return alertMessageFunc 
        //check if number !== 1-9; allertMessage nums 1-9 only!!!

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

        alertMessage.colSpan = "9";
        alertMessage.innerHTML = typeof strMessage === "undefined" ? "Please Fill All Boxes" : strMessage;
        alertMessage.style = "background-color:red;";
        tr.appendChild(alertMessage);
        document.querySelector('tfoot').prepend(tr);

        setTimeout(() => {
            document.querySelector('tfoot').removeChild(tr);
        }, 3000);
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

                if (!allowedArr.includes(tempValue)) {
                    enlightWrongBox(numOne, numTwo);
                    wrongNumExist = true;
                }
            }
        }

        if (zeroesExist) {
            return alertMessageFunc();
        } else if (wrongNumExist) {
            return alertMessageFunc(wrongNumMessage);
        }
    }

}