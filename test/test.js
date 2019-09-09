
// //During the test the env variable is set to test
// // process.env.NODE_ENV = 'test';

// // let mongoose = require("mongoose");
// let students = require('../routes/students');

// //Require the dev-dependencies
// let chai = require('chai');
// //let expect = require('expect')
// let chaiHttp = require('chai-http');
// let server = require('../app');
// let should = chai.should();
// var assert = require('chai').assert;
// chai.use(chaiHttp);
// //Our parent block
// describe('students', () => {
//     // beforeEach((done) => { //Before each test we empty the database
//     //     students.remove({}, (err) => { 
//     //        done();         
//     //     });     
//     // });
// /*
//   * Test the /GET route
//   */
// //   describe('/GET students', () => {
//       it('it should GET all the students', (done) => {
//         chai.request("http://localhost:8008")
//             .get('/students')
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//                res.body.length.should.be.above(13);
//               done();
//             });
//       });
//   });

//   describe('/GET students/20091040', () => {
//     it('it should GET all the students', (done) => {
//       chai.request("http://localhost:8008")
//           .get('/students/20091040')
//           .end((err, res) => {
//               res.should.have.status(200);
//               res.body.should.be.a('array');
//              res.body.length.should.be.above(13);
//             done();
//           });
//     });
// });


// });




// // it('should add an item on post', function(done) { 
// //     chai.request("http://localhost:8008")
// // .send ({"rollNumber":"20091030", "name" :"Jay"})

// //         .post('/students') 
// //           .end((err, res) => { 
// //             //assert.isString(res.body.rollNumber);
// //             // res.should.have.status(201); 
// //             // res.should.be.json; 
// //              res.body.should.be.a('array'); 
// //              res.body.should.have.property('name'); 
// //             // res.body.should.have.property('rollNumber'); 
// //             // res.body.name.should.be.a('string'); 
// //             // res.body.rollNumber.should.be.a('number'); 
// //             // //res.body.name.should.equal('Spam'); 
// //             // // res.body.rollNumber.should.be.above(10); 
// //              res.body.rollNumber.should.equal(8);
// //             done(); 
// //         }); 
// // });


// // describe('students', () => {
// // describe('/POST students', () => {
// //     it('it should POST the student detail', (done) => {
// //       chai.request("http://localhost:8008")
// //           .post('/students')
// //           .end((err, res) => {
// //               //res.should.have.status(200);
// //               //res.body.should.be.a('array');
// //               res.body.length.should.be.above(10);
// //               //res.body.rollNumber.should.be.a('number'); 
// //               //res.body.rollNumber.should.equal(8);
// //             done();
// //           });
// //     });
// // });

// // });