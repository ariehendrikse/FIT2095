let express = require('express');
let app = express();
app.get('/items/:itemid', function (req, res) {
    console.log(typeof(req.params));
  })
app.listen(8080);