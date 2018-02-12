var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connection.openUri('mongodb://localhost/bookAPI');

var Book = require('./models/bookModel');

var app = express();
var port = process.env.PORT || 3000;

var bookRouter = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

bookRouter.route('/books')
    .post(function(req, res){
       var book = new Book(req.body);
       book.save();
       res.status(201).send(book) // 201 = created

    })
    .get(function(req, res){

        var query = {};

        if(req.query.genre){
            query.genre = req.query.genre
        };

        Book.find(query, function(err, books){
            if(err) 
            res.status(500).send(err);
            else 
                res.json(books)  
        })
    });

bookRouter.route('/books/:bookId')
    .get(function(req, res){

        Book.findById(req.params.bookId, function(err, book){
            if(err) 
            res.status(500).send(err);
            else 
                res.json(book)  
        })
    });

app.use('/api', bookRouter);

app.get('/', function (req, res) {
    res.send('Welcome to my API');
});

app.listen(port, function () {
    console.log('Gulp is running my app on port: ' + port);
});

module.exports = app;