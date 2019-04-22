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

/* Add whatever endpoints you need! Remember that your API endpoints must
 * have '/api' prepended to them. Please remember that you need at least 5
 * endpoints for the API, and 5 others.
 */

 //******************* */
 // RENDERS HOME PAGE
 //******************* */
app.get('/',function(req,res){
  res.render('home',{
    data: _DATA
  });
});

//**************** */
// API GET REQUEST
//**************** */
app.get('/api/getPlayers',function(req,res){
  var players = [];
  _.each(_DATA, function(value) {
        players.push(value);
})
  res.json(players);
});

/***************************** */
// RENDER ADD PLAYER HTML FORM
//**************************** */
app.get("/addImage", function(req, res) {
  res.render('addImage');
});

//************************* */
// ADD PLAYER VIA HTML FORM
//************************* */
app.post('/addImage', function(req, res) {
  
});

app.get("/addAnnouncement", function(req, res) {
  res.render('addAnnouncement',{
    data: _DATA
  });
});

app.post("/addAnnouncement", function(req, res) {
  _.each(_DATA, function(value) {
    value.announcements=req.body.announcements;
    console.log(value.announcements);
  })
  
  // console.log(value.announcements);
  dataUtil.saveData(_DATA);
  res.redirect("/addAnnouncement");
});

app.get("/announcementPreview", function(req, res) {
  res.render('announcementPreview',{
    data: _DATA
  });
});

app.get("/addQOD", function(req, res) {
  res.render('qod.handlebars',{
    data: _DATA
  });
});

app.post("/addQOD", function(req, res) {
  _.each(_DATA, function(value) {
    value.qod = req.body.qod;
    console.log(value.qod);
  })
  
  // console.log(value.announcements);
  dataUtil.saveData(_DATA);
  res.redirect("/addQOD");
});

app.get("/qodPreview", function(req, res) {
  res.render('qodPreview',{
    data: _DATA
  });
});

app.get("/editSignin", function(req, res) {
  res.render('signin',{
    data: _DATA
  });
});

app.post("/removeFirst", function(req, res) {
  _.each(_DATA, function(value) {
    value.signin.shift();
  })

  var count = 1;
  var index = 0;
  _.each(_DATA, function(value) {
    var arr = value.signin;
    for(var i = 0; i < arr.length; i++) {
      console.log(arr[index][0]);
      arr[index][0] = count;
      count++;
      index++;
    }
  })

  
  // console.log(value.announcements);
  dataUtil.saveData(_DATA);
  res.redirect("/editSignin");
});

app.get("/calender", function(req, res) {
  res.render('calender',{
    data: _DATA
  });
});

app.listen(3000, function() {
    console.log('Listening on port 3000!');
});
