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

    }
}