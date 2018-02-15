var express = require('express');
var app = express();

const PORT = process.env.PORT || 3000;
app.set("view engine", "ejs");

app.use(function(req, res, next) {
  if (req.header['x-forwarded-proto'] === 'https') {
    res.redirect('http://' + req.hostname + req.url);
  } else {
    next();
  }
});

app.use(express.static(__dirname + '/public'));


app.get("/", function (req, res) {
  res.render("index");
});
app.get("/index", function (req, res) {
  res.redirect('/');
});

app.get("/about", function (req, res) {
  res.render("about");
});

app.get("/contact", function(req, res) {
  res.render("contact");
});

app.get("/linkedin", function (req, res) {
  res.redirect("https://so.linkedin.com/in/amir-zaki?trk=profile-badge");
});
app.get("/twitter", function (req, res) {
  res.redirect("https://twitter.com/intent/tweet?screen_name=amirrzaki&ref_src=twsrc%5Etfw");
});
app.get("/fb", function(req, res) {
  res.redirect("https://www.facebook.com/cabdalla22");
});


app.listen(PORT, function() {
  console.log("Roll-Dice Server Is On Port 3000");
});
