// Implementation of a basic web server
// using the Express.jsframework.

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const { generate } = require('./functions');

// the body-parser convert the request body
// from a buffer into string that we can read.  
// it will then add the data to the req (request) object
// under the key body

const bodyParser = require("body-parser");
console.log(bodyParser);
app.use(bodyParser.urlencoded({extended: true}));

// adding the cookie-parser
var cookieParser = require('cookie-parser')
app.use(cookieParser());

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
  let longURL = urlDatabase[req.params.shortURL];
  res.redirect(longURL)
  });


app.get("/urls/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  res.render("urls_show");
  });
  
app.get("/urls", (req, res) => {
    // how this route handler will look like
    let templateVars = { urls: urlDatabase, x: 'yay' };
    res.render("urls_index", templateVars);
  });
  
app.get("/urls/:id", (req, res) => {
  // how this route handler will look like
  let templateVars = {} 
  // let templateVars = { urls: urlDatabase };
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

// adding get operation for cookie
app.get('/cookie', (req, res) => {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)

  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)

  // after 

})

app.get('/u/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDatabase[shortURL];
  res.redirect(longURL);
})


// POST
app.post("/urls", (req, res) => {
  console.log('Entering post urls');
    const randomString = generate();
    let shortURL = randomString;
    let longURL = req.body.longURL;
    urlDatabase[shortURL] = longURL;
    let templateVars = { urls: urlDatabase };
    res.render("urls_index", templateVars);
})

// Delete
app.post('/urls/:shortURL/delete', (req, res) => {
  console.log(urlDatabase)
  delete urlDatabase[req.params.shortURL];
  console.log(req.params.shortURL);
  res.redirect("/urls");
})

// Edit
app.post('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  // let templateVars = {
  //   'shortURL': shortURL,
  //   'longURL': urlDatabase[shortURL],
  // };
  // res.render("urls_show", templateVars);

  urlDatabase[shortURL] = req.body.longURL
  res.redirect('/urls');
})

// Login
app.post('/login', (req, res) => {
  // console.log(req.body.username);
});

// Edit

app.get('/urls/:shortURL/edit', (req, res) => {
  const shortURL = req.params.shortURL;
  let templateVars = {
    'shortURL': shortURL,
    'longURL': urlDatabase[shortURL],
  };
  res.render("urls_show", templateVars);
})


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


