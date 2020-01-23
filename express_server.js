// Implementation of a basic web server
// using the Express.jsframework.

const express = require("express");
const app = express();
const PORT = 8080; // default port 8080
const { generate } = require('./functions');
const { checkEmailInUsers } = require('./functions');

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({ extended: false }));

// the body-parser convert the request body
// from a buffer into string that we can read.  
// it will then add the data to the req (request) object
// under the key body

const bodyParser = require("body-parser");
console.log(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));

// adding the cookie-parser
var cookieParser = require('cookie-parser');
app.use(cookieParser());

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

const users = {
  "userRandomID": {
    id: "userRandomID",
    email: "user@example.com",
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID",
    email: "user2@example.com",
    password: "dishwasher-funk"
  }
}

app.use(bodyParser.urlencoded({ extended: true }));

// Sets

app.set("view engine", "ejs");


// Gets

app.get("/urls/new", (req, res) => {
  const user_id = req.cookies.user_id;
  const user = users[user_id];
  if (user) {
    const tempVars = {
      "user": user
    };

    res.render("urls_new", tempVars);
  } else {
    res.redirect('/login');
  }

});


app.get("/urls/:shortURL", (req, res) => {
  let longURL = urlDatabase[req.params.shortUrl];
  res.redirect(longURL)
});


app.get("/urls/:id", (req, res) => {
  let longURL = urlDatabase[req.params.id];
  res.render("urls_show");
});

app.get("/urls", (req, res) => {
  // how this route handler will look like
  const user_id = req.cookies.user_id;
  const user = users[user_id];
  console.log(user_id);
  console.log(user);
  console.log(users)


  let templateVars = { urls: urlDatabase, user: user };
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

// Register
app.get('/register', (req, res) => {
  const user_id = req.cookies.user_id;
  const user = users[user_id];
  const temptVars = {
    "user": user
  }
  res.render("register", temptVars);

});

// Login
app.get('/login', (req, res) => {
  const user_id = req.cookies.user_id;
  const user = users[user_id];
  const temptVars = {
    "user": user
  }
  // res.render("urls_new", temptVars);
  res.render("login", temptVars);

});

// POST
app.post("/urls", (req, res) => {
  console.log('Entering post urls');
  const randomString = generate();
  let shortURL = randomString;
  let longURL = req.body.longURL;
  urlDatabase[shortURL] = longURL;
  let templateVars = { urls: urlDatabase, "user": users[req.cookies.user_id] };
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
  console.log('The login username is', req.cookies.username);
  const username = req.body.username;
  res.cookie('username', username);
  res.redirect('/urls');
});

// Logout
app.post('/logout', (req, res) => {
  // clear the username cookie
  console.log('The logout username is', req.cookies.username);
  // res.cookie('username', null);
  res.clearCookie('username');

  console.log('The logout username should be null ', req.cookies.username);
  // redirect the user back to the /urls page
  res.redirect('/urls');
})

// Edit

app.get('/urls/:shortURL/edit', (req, res) => {
  const user_is = req.cookies.user_id;
  const user = users[user_is];
  const shortURL = req.params.shortURL;
  let templateVars = {
    'shortURL': shortURL,
    'longURL': urlDatabase[shortURL],
    'user': user
  };
  res.render("urls_show", templateVars);
})

// Login
app.post('/login', (req, res) => {
  // how this route handler will look like

  let templateVars = { urls: urlDatabase };
  res.render("urls_index", templateVars);
  
});

// My version of Register for Post Method
// app.post('/register', (req, res) => {
//   const username = req.body.username;
//   const email = req.body.email;

//   const temptVars = {
//     "username": username,
//     "email": email
//   }
//   // res.render("urls_new", temptVars);
//   res.redirect('/login');

// });

// The requested version of Register for Post Method
app.post('/register', (req, res) => {
  // add a new user object to the global users object
  const randomID = generate();
  // console.log(randomID);
  const email = req.body.email;
  // console.log(email);
  const password = req.body.password;
  // console.log(password);

  if (email === '' || password === '') {
    res.status(400).send('The email or password is empty string');
  } else if (checkEmailInUsers(users, email)) {
    res.status(400).send('You are already registered');
  } else {
    // add new user
    users[randomID] = {
      "id": randomID,
      "email": email,
      "password": password
    }
    // add cookie
    res.cookie('user_id', randomID);
    console.log(users);

    console.log(users[randomID].email);
    console.log(users[randomID].password);
    console.log(checkEmailInUsers(users, email));
    res.redirect('/urls');
  }
})



app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});


