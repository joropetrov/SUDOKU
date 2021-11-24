var expect = require('chai').expect;

describe('sudokuMode', function (){
    var sudokuMode = require('../sudokuWorkFuncs').sudokuMode;

    it('should return easySudokuObj with easyMode button', function(){

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

    it('should return different objects', function (){

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
        expect(JSON.stringify(sudokuMode('difficultSudokuMode'))).to.not.equal(difficultSudokuMode);
    });
});