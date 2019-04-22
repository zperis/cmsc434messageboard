var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var app = express();

// MIDDLEWARE
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use('/public', express.static('public'));

// My Variables
var fs = require('fs');
var dataUtil = require("./data-util");
var _DATA = dataUtil.loadData().players;
var handlebars = exphbs.handlebars;
var _ = require("underscore");
const { parse } = require('querystring');

 //******************* */
 // RENDERS HOME PAGE
 //******************* */
app.get('/',function(req,res){
  res.render('home',{
    data: _DATA
  });
});

 //**************************** */
 // RENDERS Announcements Page
 //**************************** */
app.get("/addAnnouncement", function(req, res) {
  res.render('addAnnouncement',{
    data: _DATA
  });
});


 //************************************ */
 // Adds new announcement to data.json
 //************************************ */
app.post("/addAnnouncement", function(req, res) {
  _.each(_DATA, function(value) {
    value.announcements=req.body.announcements;
  })
  
  dataUtil.saveData(_DATA);
  res.redirect("/addAnnouncement");
});


 //**************************** */
 // No longer being used
 //**************************** */
app.get("/announcementPreview", function(req, res) {
  res.render('announcementPreview',{
    data: _DATA
  });
});


 //**************************** */
 // RENDERS QOD Page
 //**************************** */
app.get("/addQOD", function(req, res) {
  res.render('qod.handlebars',{
    data: _DATA
  });
});


 //**************************** */
 // Adds new quote to data.json
 //**************************** */
app.post("/addQOD", function(req, res) {
  _.each(_DATA, function(value) {
    value.qod = req.body.qod;
  })
  
  dataUtil.saveData(_DATA);
  res.redirect("/addQOD");
});


 //**************************** */
 // No longer being used
 //**************************** */
app.get("/qodPreview", function(req, res) {
  res.render('qodPreview',{
    data: _DATA
  });
});


 //**************************** */
 // RENDERS Signin Page
 //**************************** */
app.get("/editSignin", function(req, res) {
  res.render('signin',{
    data: _DATA
  });
});


 //************************************ */
 // REMOVES the first element in queue
 //************************************ */
app.post("/removeFirst", function(req, res) {
  _.each(_DATA, function(value) {
    value.signin.shift();
  })

  var count = 1;
  var index = 0;
  _.each(_DATA, function(value) {
    var arr = value.signin;
    for(var i = 0; i < arr.length; i++) {
      arr[index][0] = count;
      count++;
      index++;
    }
  })

  dataUtil.saveData(_DATA);
  res.redirect("/editSignin");
});


app.post("/removeCurrent", function(req, res) {
  res.redirect("/editSignin");
});

 //**************************** */
 // RENDERS Calender Page
 //**************************** */
app.get("/calender", function(req, res) {
  res.render('calender',{
    data: _DATA
  });
});

app.get("/game", function(req, res) {
  res.render('game',{
    data: _DATA
  });
});


 //*********************************** */
 // Specifies which port to listen on
 //*********************************** */
app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
