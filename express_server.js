const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080; // default port 8080
const { generate } = require('./helpers');
const { checkEmailAndPasswordInUsers } = require('./helpers');
const { checkEmailInUsers } = require('./helpers');
const bcrypt = require('bcrypt');


//cookie-session
var cookieSession = require('cookie-session')
app.use(cookieSession({
  name: 'session',
  keys: ['/*gjugjugjuju secret keys */'],

  // Cookie Options
  maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))


app.use(express.static('public'))
const bodyParser = require("body-parser");
console.log(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));
var cookieParser = require('cookie-parser');
app.use(cookieParser());


const urlDatabase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "aJ48lW" },
  "9sm5xK": { longURL: "http://www.google.com", userID: "aJ48lW" }
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
  },
  "user3RandomID": {
    id: "user3RandomID",
    email: "ladanks@gmail.com",
    password: "1234"
  }
}

// SETS

app.set("view engine", "ejs");

// GETS

app.get("/urls/new", (req, res) => {
  const user_id = req.session.user_id;
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
  const user_id = req.session.user_id;
  const user = users[user_id];
  if (user) {
    let filteredURLs = {};
    for (let shortUrl in urlDatabase) {
      if (urlDatabase[shortUrl].userID === user_id) {
        filteredURLs[shortUrl] = urlDatabase[shortUrl];
      }
    }

    let templateVars = { urls: filteredURLs, user: user };
    res.render("urls_index", templateVars);
  } else {
    res.redirect('/login');
  }
});

app.get("/set", (req, res) => {
  const a = 1;
  res.send(`a = ${a}`);
});

app.get("/fetch", (req, res) => {
  res.send(`a = ${a}`);
});

app.get("/hello", (req, res) => {
  let templateVars = { greeting: 'Hello World! ' };
  res.render("hello_world", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get('/cookie', (req, res) => {
  // console.log('Cookies: ', req.session);
  // console.log('Signed Cookies: ', req.signedCookies)
})

app.get('/u/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  // console.log(shortURL);
  // the urlDatabase[shortURL] is returning a dictionary
  // one of the keys is longURL
  const longURL = urlDatabase[shortURL].longURL;
  // console.log(longURL);
  res.redirect(longURL);

})

app.get('/register', (req, res) => {
  const user_id = req.session.user_id;
  const user = users[user_id];
  const password = req.params.password;
  const temptVars = {
    "user": user
  }
  res.render("register", temptVars);
});

app.get('/login', (req, res) => {
  const user_id = req.session.user_id;
  const user = users[user_id];
  const temptVars = {
    "user": user
  }
  res.render("login", temptVars);
});

// POSTS
app.post("/urls", (req, res) => {
  const randomString = generate();
  let shortURL = randomString;
  urlDatabase[shortURL] = { longURL: req.body.longURL, userID: req.session.user_id };
  res.redirect('/urls')
})

app.post('/urls/:shortURL/delete', (req, res) => {
  const shortURL = req.params.shortURL;
  const createrOfURL = urlDatabase[shortURL].userID;
  const user_id = req.session.user_id;
  const user = users[user_id];
  if (user !== undefined && user.id === createrOfURL) {
    delete urlDatabase[req.params.shortURL];
    res.redirect("/urls");
  } else {
    res.redirect("/login");
  }
})

app.post('/urls/:shortURL', (req, res) => {
  const shortURL = req.params.shortURL;
  const createrOfURL = urlDatabase[shortURL].userID;
  const user_id = req.session.user_id;
  const user = users[user_id];
  if (user !== undefined && user.id === createrOfURL) {
    urlDatabase[shortURL].longURL = req.body.longURL
    res.redirect('/urls');
  } else {
    res.redirect('/login');
  }
})

app.post('/login', (req, res) => {
  const email = req.body.email;
  const enteredPassword = req.body.password;
  const user_id = checkEmailInUsers(users, email);
  if (!user_id) {
    // console.log('user id does not exist');
    res.redirect('/login');
  } else {
    const hashPassword = users[user_id].password;
    if (bcrypt.compareSync(enteredPassword, hashPassword)) {
      req.session.user_id = user_id;
      res.redirect('/urls');
    } else {
      // console.log('pass not match');
      res.redirect('/login');
    }
  }
});

app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
})

app.get('/urls/:shortURL/edit', (req, res) => {
  // "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userID: "aJ48lW" },
  const shortURL = req.params.shortURL;
  const createrOfURL = urlDatabase[shortURL].userID;
  const user_id = req.session.user_id;
  const user = users[user_id];
  if (user !== undefined && user.id === createrOfURL) {
    let templateVars = {
      'shortURL': shortURL,
      'longURL': urlDatabase[shortURL] && urlDatabase[shortURL].longURL,
      'user': user
    };
    res.render("urls_show", templateVars);
  }
  else {
    res.redirect('/login');
  }
})

app.post('/register', (req, res) => {
  const randomID = generate();
  const email = req.body.email;
  const password = req.body.password;
  const hashPassword = bcrypt.hashSync(password, 10);

  if (email === '' || password === '') {
    res.status(400).send('The email or password is empty string');
  } else if (checkEmailInUsers(users, email)) {
    res.status(400).send('You are already registered');
  } else {
    if (!checkEmailInUsers(users, email));
    users[randomID] = {
      "id": randomID,
      "email": email,
      "password": hashPassword
    }
    req.session.user_id = randomID;
    res.redirect('/urls');
  }
})

app.listen(PORT, () => {
  // console.log(`Example app listening on port ${PORT}!`);
});


