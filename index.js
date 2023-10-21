const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();

app.set('view engine', 'ejs'); // document format rendering
app.use(express.static('public')); // documents file

// receives request data in format url and json
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.listen(3000, () => console.log('Its running'));