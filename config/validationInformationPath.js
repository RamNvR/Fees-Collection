var rulesAndMessages = {};
rulesAndMessages["basic"] = {};
rulesAndMessages["basic"].rules = {
    'sex': {
        required: true
    },
    'studentDOB': {
        required: true
    },
    'placeOfBirth': {
        required: true
    },
    'studentState': {
        required: true
    },
    'studentNationality': {
        required: true
    },
    'studentReligion': {
        required: true
    },
    'studentMotherTongue': {
        required: true
    },
    'studentHosteler': {
        required: true
    },
    'hostelRoomNumber': {
        required: true
    },
    'hostelName': {
        required: true
    }
};
rulesAndMessages["basic"].messages = {
    'sex': {
        required: 'Gender is required'
    },
    'studentDOB': {
        required: 'Please choose your Date of birth'
    },
    'placeOfBirth': {
        required: 'Place of birth is required'
    },
    'studentState': {
        required: 'Please choose your state'
    },
    'studentNationality': {
        required: 'Please choose your nationality'
    },
    'studentReligion': {
        required: 'Please choose your religion'
    },
    'studentMotherTongue': {
        required: 'Please choose your mother tongue'
    },
    'studentHosteler': {
        required: 'Hosteller status is required'
    },
    'hostelRoomNumber': {
        required: 'Hostel room number is required'
    },
    'hostelName': {
        required: 'Hostel block name is required'
    }
};

rulesAndMessages["family"] = {};
rulesAndMessages["family"].rules = {
    'fatherName': {
        required: true
    },
    'fatherNumber': {
        required: true,
        phoneUS: true
    },
    'fatherAnnualIncome': {  
        digits: true
    },
    'studentMotherName': {
        required: true
    },
    'studentMotherNumber': {
        phoneUS: true
    },
    'motherIncome': {
        digits: true
    },
    'fatherEmailId': {
        email: true
    },
    'motherEmailId': {
        email: true
    },
    'guardianContactNo': {
        phoneUS: true
    }
};
rulesAndMessages["family"].messages = {
    'fatherName': {
        required: 'Father name is required'
    },
    'fatherNumber': {
        required: 'Father number is required'
    },
    'studentMotherName': {
        required: 'Mother name is required'
    },
    'studentMotherNumber': {
        required: 'Mother number is required'
    }
};


rulesAndMessages["identity"] = {};
rulesAndMessages["identity"].rules = {
    'studentAadhaarNumber': {
        required: true,
        digits: true
    },
    'bloodGroup': {
        required: true
    },
    'studentResidentStatus': {
        required: true
    },
    'studentIdentity1': {
        required: true
    },
    'studentHeight': {
        number: true
    },
    'studentWeight': {
        number: true
    }
};
rulesAndMessages["identity"].messages = {
    'studentAadhaarNumber': {
        required: 'Please provide your aadhaar number'
    },
    'bloodGroup': {
        required: 'Please provide your blood group'
    },
    'studentResidentStatus': {
        required: 'Residential status is required'
    },
    'studentIdentity1': {
        required: 'Please provide your identity'
    }
};

module.exports = rulesAndMessages;