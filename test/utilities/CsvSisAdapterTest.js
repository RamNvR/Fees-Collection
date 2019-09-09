var chai = require('chai');
var expect = chai.expect; // we are using the "expect" style of Chai

var sisAdapter = require('../../utilities/CsvSisAdapter');

describe('SisAdapter', function() {
    it('calculateAndUpdateCgpa should not set CGPA if there is an arrear' , function() {
        var testStudentRecord = getTest
        var formattingFunction = sisAdapter.calculateAndUpdateCgpa("DD-MMM-YYYY");
        var sampleRegRecord = {
            dobStr:  "25/11/1999"
        };
        
        var actual = formattingFunction(sampleRegRecord);
        console.log(actual);
        var expected = "25-Nov-1999";
        expect(actual).to.deep.equal(expected);
    });

});

function getTestStudentRecord() {
    return {

    };
}