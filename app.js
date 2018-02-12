var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;

app.use(function(req, res, next) {
  if (req.header['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {
  res.render("index.html");
});




app.listen(PORT, function() {
  console.log("Roll-Dice Server Is On Port 3000");
});
