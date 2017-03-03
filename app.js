var express = require('express');
var app = express();
var compression = require('compression');
var router = require('./router.js')
var port = 8000;
var bodyParser = require('body-parser');
app.use('/static', express.static('web'));
app.use(compression());


app.use(bodyParser.urlencoded({    
  extended: true
}));


app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    next();
});


app.use(router);

app.listen(port);

console.log(`app start at port ${port}`)
