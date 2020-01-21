// Implementation of a basic web server
// using the Express.jsframework.
const { generate } = require('./functions');
const express = require("express");
const app = express();
const PORT = 8080; // default port 8080

// the body-parser convert the request body
// from a buffer into string that we can read.  
// it will then add the data to the req (request) object
// under the key body

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(bodyParser.urlencoded({extended: true}));

// Sets

app.set("view engine", "ejs");


// Gets

app.get("/urls/new", (req, res) => {
    res.render("urls_new");
  });

app.get("/urls/:shortURL", (req, res) => {
    let templateVars = { shortURL: req.params.shortURL, longURL: urlDatabase[req.params.shortURL] };
    res.render("urls_show", templateVars);
  });

app.get("/urls", (req, res) => {
    // how this route handler will look like
    let templateVars = { urls: urlDatabase };
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
    // templateVars object contains string hello world under
    // key = greeting
    // pass templateVars object to the template called hello_world
    let templateVars = { greeting: 'Hello World! ' };
    res.render("hello_world", templateVars);
    // res.send("<html><body>Hello <b>World</b></body></html>\n");
  });


app.get("/urls.json", (req, res) => {
    res.json(urlDatabase);
  });


app.get("/", (req, res) => {
  res.send("Hello!");
});


// POST
app.post("/urls", (req, res) => {
    console.log(req.body);  // Log the POST request body to the console
    const randomString = generate();
    //Update your express server so that the shortURL-longURL key-value pair
    // are saved to the urlDatabase when it receives a POST request to /urls
    let templateVars = { shortURL: randomString, longURL: urlDatabase[randomString] };
    res.send(templateVars);         // Respond with 'Ok (we will replace this)
    // res.render("urls_show", templateVars);
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


