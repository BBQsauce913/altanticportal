var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");

var app = express();
var port = 2045;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));


app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "atlantic_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

// ======================================================

app.get("/", function(req, res){
    connection.query("SELECT * FROM truckloads", function(err, data){
        if (err) throw err;
        res.render("index", { truckloads: data });
    });
});

// POST BUTTON
// ======================================================

var k = 0


app.post("/", function(req, res) {
    connection.query("INSERT INTO truckloads (lane, pickupdate, pickupnumber, ponumber, additional_info) VALUES (?, ?, ?, ?, ?)", 
    [req.body.truckloads, req.body.pickupdate, req.body.pickupnumber, req.body.ponumber, req.body.additional_info], CallbackQuery );
      res.redirect("/");
    });


  app.delete("/:id", function(req, res) {
    connection.query("DELETE FROM truckloads WHERE id = ?", [req.params.id], CallbackQuery );
      res.redirect("/");
    });
  

  app.put("/", function(req, res) {
      connection.query("UPDATE truckloads SET status = ? WHERE id = ?", [req.body.status, req.body.id], CallbackQuery );
        res.redirect("/");
      });
    
    // created functions for CallBack Query to help identify parts of the code
    function CallbackQuery(err, result) {
      if (err) {
        throw err;
      
       }
    }


    app.listen(port);
    console.log("listening on localhost:" + port)