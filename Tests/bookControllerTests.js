var should = require('should'),
    sinon = require('sinon');

describe('Book Controller Tests:', function(){
    describe('Post', function(){
        it('should not allow an empty title on post', function(){
            var Book = function(book){this.save = function(){}};
            
            var req = {
                body: {
                    author: 'Juniper'
                }
            }

            var res = {
                // check if status is called and what it's called with
                status: sinon.spy(),
                send: sinon.spy()
            }

            // hook up the test with bookController.js
            var bookController = require('../controllers/bookController')(Book);
            bookController.post(req, res);
            // 400 = bad request; args[0][0] = we test only the first time res was called and only the first argument
            res.status.calledWith(400).should.equal(true, 'Bad Status' + res.status.args[0][0])
            res.send.calledWith('Title is required').should.equal(true);
        })
    })
})