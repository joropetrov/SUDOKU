var expect = require('chai').expect;

describe('checkForDuplicates', () => {
    
    let checkForDuplicatesSet = require('../sudokuServiceFunctions').checkForDuplicates;

    it('return true if set.size !== array.lenght', () => {
        expect(checkForDuplicatesSet([1,2,2])).to.be.true;
    });

    it('return false if set.size == array.lenght', () => {
        expect(checkForDuplicatesSet([1,2,3])).to.be.false;
    });

    it('return false if set.size == array.lenght', () => {
        let arr = [1,2,3,4];
        let newSetArr = new Set(arr);
        expect(newSetArr.size).to.equal(arr.length);
    });
});

