const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require('body-parser');
const moment = require('moment');


//Configure Express
const app = express()
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('public'));
app.use(express.static('images'));
app.use(express.static('css'));


const Author = require('./models/author');
const Book = require('./models/book');
const author = require("./models/author");

app.use(bodyparser.urlencoded({ extended: false }));
app.listen(8080);
// Connection URL
const url = "mongodb://localhost:27017/Library";

mongoose.set('useFindAndModify', false);
//Connect to mongoDB server
mongoose.connect(url, { useNewUrlParser: true },
    function (err, client) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Connected successfully to server");
        }
    });

//GET request: send the page to the client
app.get('/', function (req, res) {
    res.render('index');
});
//POST request: receive the details from the client and insert new document (i.e. object) to the collection (i.e. table)
app.post('/addbookdata', function (req, res) {
    let bookDetails = req.body
    Book.find({isbn: bookDetails.isbn},function (err, data) {
        if(data.length>0){ 
        res.redirect('duplicate');
        }
        else    {
            let book1 = new Book({
            _id: new mongoose.Types.ObjectId(),
            isbn: bookDetails.isbn,
            title: bookDetails.title,
            author: bookDetails.author,
            pubdate: bookDetails.pubdate,
            summary: bookDetails.summary
            });
            book1.save(function (err) {
                if (err){
                    res.redirect('/addbook')
                    console.log(err) ;
                }

                else{
                    console.log('Success')
                    Author.findByIdAndUpdate(bookDetails.author, {$inc: { numBooks: 1 }},{ runValidators: true },
                        function (err, docs) { 
                    if (err){ 
                        console.log('Author has too many books') 
                        res.redirect('updatebooknum')
                        
                    } 
                    else{ 
                        console.log("Updated Author : ", docs); 
                        res.redirect('getbooks')
                    }
                    }
                    )
                }
            });
        }
    })
});

app.post('/addauthordata', function (req, res) {
    let authorDetails = req.body
    let auth = new Author({
        _id: new mongoose.Types.ObjectId(),
        name: {
            firstName: authorDetails.fname,
            lastName: authorDetails.lname
        },
        dob:  authorDetails.dob,
        
        address:{
            unit:authorDetails.unit,
            street: authorDetails.street,
            suburb: authorDetails.suburb,
            state: authorDetails.state,
            
        
        },
        numBooks: authorDetails.numbook,
    });
    console.log(auth)
    auth.save(function (err) {
        if (err){
            res.redirect('/addauthor')
            console.log(err) ;
        }

        else{
            console.log('Success')
            res.redirect('/getauthors')
        }
    });
    
});
//List all books
//GET request: send the page to the client. Get the list of documents form the collections and send it to the rendering engine
app.get('/getbooks', function (req, res) {
    Book.find({}).populate('author').exec(function (err, data) {
        if (err)
        {
            console.log(err)
            res.redirect('index')
        }
        else{
            res.render('listbooks', { booksDb: data });

        }
    });
});

app.get('/updatebooknum', function (req, res) {
    Author.find({},function (err, data) {
        if (err)
        {
            console.log(err)
            res.redirect('index')
        }
        else{
            res.render('updatebooknum', { authorsDb: data });

        }
    });
});

app.post('/updatebooknumdata',(req,res)=>{ 
    let authorDetails=req.body;
        
    Author.findByIdAndUpdate(authorDetails._id, { numBooks: authorDetails.numbook }, 
                            function (err, docs) { 
    if (err){ 
        res.redirect('updatebooknum')
        console.log(err) 
    } 
    else{ 
        res.redirect('getauthors')
        console.log("Updated Author : ", docs); 
    }
}
)
}
);

app.get('/getauthors', function (req, res) {
    Author.find({},function (err, data) {
        if (err){
            console.log(err)
        }
        else{
            res.render('listauthors', { authorsDb: data });
        }
        
    });
});
app.get('/duplicate', function (req, res) {
    res.render('error')
});
//Update book: 
//GET request: send the page to the client 
app.get('/updatebook', function (req, res) {
    Book.find({},function (err, data) {
        res.render('updatebook', { booksDb: data });
    });
    
});
// Add book
app.get('/addbook', function (req, res) {
    Author.find({},function (err, data) {
        if (err){
            console.log(err);
        }
        else{
            res.render('addbook.html', {authorDb : data});
        }
    });
    
});

app.get('/addauthor', function (req, res) {
    res.render('addauthor.html');
    
});
app.get('/addbook/error', function (req, res) {
    res.render('addbook')
});
//POST request: receive the details from the client and do the update
app.post('/updatebookdata', function (req, res) {
    let bookDetails = req.body;
    let filter = { isbn: bookDetails.isbn };
    let theUpdate = { $set: { 'title': bookDetails.title, 'author': bookDetails.author,'pubdate': bookDetails.pubdate,'summary': bookDetails.summary } };
    Book.updateOne(filter, theUpdate, function (err, doc) {
        if (err){
            console.log(err);
            res.redirect('updatebook')
        }
        else{
            res.redirect('getbooks')
        }
    });
})
//Update book: 
//GET request: send the page to the client to enter the book's name
app.get('/deletebook', function (req, res) {
    Book.find({}, 'isbn',function (err, data) {
        if (err) {
            console.log("Err  ", err);
        } else {
            res.render('deletebook', { booksDb: data });
        }
        
    });
});
app.get('/deleteauthor', function (req, res) {
    Author.find({}, '_id',function (err, data) {
        if (err) {
            console.log("Err  ", err);
        } else {
            res.render('deleteauthor', { authorDb: data });
        }
        
    });
});

app.post('/deleteauthordata', function (req, res) {
    let authorDetails = req.body;
    Book.deleteMany({ author: authorDetails._id }, function (err, doc) {
        if (err) {
            console.log("Err  ", err);
            res.redirect('deleteauthor')
        } else {
            console.log("Deletion All books from this author");
            Author.findByIdAndDelete(authorDetails._id, function (err, doc) {
                if (err) {
                    console.log("Err  ", err);
                    res.redirect('deleteauthor')
                } else {
                    console.log("Deleteted this Author");
                    res.redirect('getauthors')
                }
            });
        }
    });
    
});

//POST request: receive the book's name and do the delete operation 
app.post('/deletebookdata', function (req, res) {
    let bookDetails = req.body;
 
    console.log(bookDetails.isbn)
    Book.deleteOne({ isbn: bookDetails.isbn }, function (err, doc) {
        if (err) {
            console.log("Err  ", err);
        } else {
            console.log("Deletion Success");
            res.redirect('/getbooks')
        }
    });
    ;// redirect the client to list books page
});