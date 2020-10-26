let express = require('express');
let app = express();
let router = express.Router();
//Setup the view Engine
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
//Setup the static assets directories
app.use(express.static('images'));
app.use(express.static('css'));

app.get('/hello', function (req, res) {
    res.send('hello')
});


module.exports = router;