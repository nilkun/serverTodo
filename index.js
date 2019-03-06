const express = require('express');
const app = express();
const todoRoutes = require('./routes/todos')
const bodyParser = require('body-parser');

const PORT = 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/views'));

app.get('/', function(req, res) {
    res.sendFile("index.html");
});

app.use("/api/todos", todoRoutes);

app.listen(PORT, function(){
    console.log("APP IS RUNNING ON PORT " + PORT);
})