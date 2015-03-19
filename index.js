/**
 * Created by sam on 15-3-19.
 */

var path = require('path');

var express = require('express');
var packageJson = require('./package.json');

var app = express();

app.use('/static', express.static(path.resolve(__dirname, './dist')));

app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');
app.engine('html', require('ejs-mate'));

app.get('/', function(req, res, next){
  return res.render('index');
});

app.listen(3000);

module.exports = app;