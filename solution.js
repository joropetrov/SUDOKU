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

    function fillSudokuMatrix(){

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

    function checkSudoku(){
        
        fillSudokuMatrix();
        console.log(sudookuMatrix);
        let checkerIfZeroExist = sudookuMatrix.map((element) => {
            return element.filter(el => {
                if (el === 0) {
                return false;
            }});
          });
          console.log(checkerIfZeroExist);
        //check if sudoku contains 0 --> return alertMessageFunc 
        //check if number !== 1-9; allertMessage nums 1-9 only!!!

    }

    function alertMessageFunc(strMessage){
        
        let stringMessage = strMessage == undefined ? "PLEASE FILL ALL BOXES" : strMessage;
        let alertMessage = document.createElement('th');
        let tr = document.createElement('tr');

        alertMessage.colSpan = "9";
        alertMessage.innerHTML = stringMessage;
        alertMessage.style="background-color:red;";
        tr.appendChild(alertMessage);
        document.querySelector('tfoot').prepend(tr);

        setInterval(() => {
            document.querySelector('tfoot').removeChild(tr);
        }, 3000);
        return;
    }
}