
var http = require('http');
var path = require('path');
var moment = require('moment');


var express = require('express');
var router = express();
var server = http.createServer(router);


router.use(express.static(path.resolve(__dirname, 'client')));

router.get('/:date', function(req, res) {
  res.json(dateConvert(req.params.date));
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  
});

// Converts a string and returns an object:
// { "unix": 1450137600, "natural": "December 15, 2015" }
// If not a valid date, then returns
// { "unix": null, "natural": null }
function dateConvert(date) {
  
  var dateObj = new Date(date);
  var newDate;
  
  // If Date is Not A Number
  if( isNaN(date) && moment(dateObj).isValid() ) {
    newDate = {
      unix: moment(dateObj).format("X"),
      natural: moment(dateObj).format("MMMM D YYYY")
    };
  } else if( !isNaN(date) && moment(date*1000).isValid() ) {
    newDate = {
      unix: date,
      natural: moment(date * 1000).format("MMMM D YYYY")
    };
  } else {
    newDate = {
      unix: null,
      natural: null
    };
  }
  
  return newDate;

}