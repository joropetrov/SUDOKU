var expect = require('chai').expect;

describe('sudokuMode', function (){
    var sudokuMode = require('../sudokuServiceFunctions').sudokuMode;

    it('should return easySudokuObj with easyMode button', () =>{

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

        expect(JSON.stringify(sudokuMode('easyMode'))).to.equal(JSON.stringify(easySudokuObj));
        
    });

    it('should return different objects', () =>{

        let difficultSudokuMode = {
            '0': [0, 0, 0, 0, 0, 1, 2, 3, 0],
            '1': [0, 0, 0, 0, 0, 0, 4, 5, 6],
            '2': [0, 4, 6, 7, 0, 0, 0, 0, 0],
            '3': [0, 5, 8, 9, 0, 0, 0, 0, 0],
            '4': [0, 0, 0, 0, 0, 0, 0, 0, 0],
            '5': [0, 0, 0, 0, 0, 6, 4, 2, 0],
            '6': [0, 0, 0, 0, 0, 2, 1, 8, 0],
            '7': [0, 8, 2, 3, 0, 0, 0, 0, 0],
            '8': [0, 7, 3, 6, 0, 0, 0, 0, 4]
        };
        expect(JSON.stringify(sudokuMode('difficultSudokuMode'))).to.not.equal(JSON.stringify(difficultSudokuMode));
    });

    it('should return same obj with testMode button', () =>{

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
        expect(JSON.stringify(sudokuMode('testMode'))).to.equal(JSON.stringify(correctSudocuForTest));
    });

});