const express = require("/express");
const app = express();
const PORT = 8080;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

// adding the cookie-parser
var cookiParser = require('cookie-parser');
app.use(cookiParser());

const urlDatabase = {
    "b2xVn2": "http://www.lighthouselabs.ca",
    "9sm5xK": "http://www.google.com"
}

app.use(bodyParser.urlencoded({extended: true}));

// sets
app.get("/urls/new", (req, res) => {
    res.render("urls_new");
});

app.get("/urls/:shortURL", (req, res) => {
    let longURL = urlDatabase[req.params.shortURL];
    res.redirect(longURL);
});

app.get("/urls/", (req, res) => {
    let templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
})

app.get("urls:/id", (req, res) => {
    let templateVars = {}
    res.render("urls_index", templateVars);
})

app.get("/urls/:id", (req, res) => {
    let templateVars = {};
    res.render("urls_index", templateVars);
});

app.get("/set", (req, res) => {
    const a = 1;
    res.send(`a = ${a}`);
});

app.get("/fetch", (req, res) => {
    res.send(`a = ${a}`);
});

app.get("/hello", (req, res) => {
    let templateVars = { greeting: 'Hello World!'};
    res.send("hello_world", templateVars);
});

app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
});

app.get("/", (req, res) => {
    res.send("Hello");
})

// app.get('/cookie', (req, res) => {
//     console.log('Cookies', (req, res) => {

//     }
// })