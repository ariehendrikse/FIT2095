const express = require("express");
const mongodb = require("mongodb");
const bodyparser = require('body-parser');

//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('css'));

app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);
//Configure MongoDB
const MongoClient = mongodb.MongoClient;
// Connection URL
const url = "mongodb://localhost:27017/";
//reference to the database (i.e. collection)
let db;
//Connect to mongoDB server
MongoClient.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
            db = client.db("week5");
            //db.createIndex( { "isbn": 1 }, { unique: true } )
        }
    });
//Routes Handlers
//Insert new book
//GET request: send the page to the client
app.get('/', function (req, res) {
    res.render('index');
});
//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/addbookdata', function (req, res) {
    let bookDetails = req.body;
    console.log(db.collection('books').find({isbn: bookDetails.isbn}).toArray.length)
    db.collection('books').find({isbn: bookDetails.isbn}).toArray(function (err, data) {
        if(data.length>0){ 
        res.redirect('duplicate');
    }
    else    {   db.collection('books').insertOne({ title: bookDetails.title, author: bookDetails.author, isbn: bookDetails.isbn,pubdate: bookDetails.pubdate,summary: bookDetails.summary });
                res.redirect('getbooks')}
    })
});
//List all books
//GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
app.get('/getbooks', function (req, res) {
    db.collection('books').find({}).toArray(function (err, data) {
        res.render('listbooks', { booksDb: data });
    });
});
app.get('/duplicate', function (req, res) {
    res.render('error')
});
//Update book: 
//GET request: send the page to the client 
app.get('/updatebook', function (req, res) {
    db.collection('books').find({}).toArray(function (err, data) {
        res.render('updatebook', { booksDb: data });
    });
});
// Add book
app.get('/addbook', function (req, res) {
    res.render('addbook.html');
});
app.get('/addbook/error', function (req, res) {
    res.render('addbook')
});
//POST request: receive the details from the client and do the update
app.post('/updatebookdata', function (req, res) {
    let bookDetails = req.body;
    let filter = { isbn: bookDetails.isbn };
    let theUpdate = { $set: { title: bookDetails.title, author: bookDetails.author,pubdate: bookDetails.pubdate,summary: bookDetails.summary } };
    db.collection('books').updateOne(filter, theUpdate);
    res.redirect('/getbooks');// redirect the client to list books page
})
//Update book: 
//GET request: send the page to the client to enter the book's name
app.get('/deletebook', function (req, res) {
    db.collection('books').find({}).toArray(function (err, data) {
        res.render('deletebook', { booksDb: data });
    });
});

app.post('/deleteauthordata', function (req, res) {
    let bookDetails = req.body;
 
    console.log(bookDetails.isbn)
    let filter = { author: bookDetails.author };
    db.collection('books').deleteMany(filter);
    res.redirect('/getbooks');// redirect the client to list books page
});
app.get('/deleteall', function (req, res) {
    db.collection('books').find({}).toArray(function (err, data) {
        authors=Array.from(new Set(data.map((item)=>item.author)));
        res.render('deleteall', { booksDb: authors });
    });
});
//POST request: receive the book's name and do the delete operation 
app.post('/deletebookdata', function (req, res) {
    let bookDetails = req.body;
 
    console.log(bookDetails.isbn)
    let filter = { isbn: bookDetails.isbn };
    db.collection('books').deleteOne(filter);
    res.redirect('/getbooks');// redirect the client to list books page
});