let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
let num1,num2;
app.use(bodyParser.urlencoded({
    extended: false
}))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');

});


app.post('/add2numbers', function (req, res) {
    
    num1=parseInt(req.body.no1);
    num2=parseInt(req.body.no2);
    let r=num1+num2;
    res.render('addition.html',{ no1: num1,no2: num2 ,result: r})
})

app.listen(8080);