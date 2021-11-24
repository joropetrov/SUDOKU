var expect = require('chai').expect;

describe('checkForDuplicatesInSquares', () => {

    let checkForDuplicates = require('../sudokuServiceFunctions').checkForDuplicatesInSquares;
    

    it('function should return false if setArr.size == array.lenght', () => {
        expect(checkForDuplicates([1,2,3,4])).to.be.false;
    })

    it('function should return true if setArr.size !== array.lenght', ()=>{

        expect(checkForDuplicates([1,2,3,4,4])).to.be.true;
    });
})