let express = require('express');
let successMessage;
let app = express();
let bodyParser = require('body-parser');
//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));




let db = [];
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.get('/', function (req, res) {
    successMessage='';
    res.render('index.html');
});
app.get('/newemployee', function (req, res) {
    res.render( 'newemployee.html',{successMessage: successMessage});
});

app.post('/newemployee', function (req, res) {
    
    now=new Date()
    age = getAge(req.body.dob);

    if (req.body.name.length<3 || req.body.dept.length<3 || age<16){
        
        res.render('invalid')
    }
    else {
        db.push({
            name: req.body.name,
            dob: req.body.dob,
            dept: req.body.dept
        })
        
        
        res.render('newemployee',{successMessage:'Success!'})
    }
    

}
)


app.get('/listemployees', function (req, res) {
    
    res.render('listemployees',{db: db});
});

app.get('/*', function (req, res) {
    
    res.render('404',db);
});

app.listen(8080)
function getAge(dob) {
    var today = new Date();
    var birthDate = new Date(dob);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }    
    return age;
}