# TinyApp
curl http://localhost:7621/aziz
download Insomnia: curl http://localhost:7621/aziz
- jan 16, thursday

  ### Review on callback

  1.Functions that are called by other functions (the other functions = higher order functions)

  2. Why they are or are not always use for synchronized, 
  3. make functions more modular and more genetic (forEach)
  4. You can get buried in "callback hell" or "callback waterfall".
  5. Hard to read and follow the control flow. 
  6. Can get lost in the scope and closures. 
  7. The time it takes for a function to terminates and the next one starts
  8. Promises applications: Midterm, twitter, react

  ```json
  {
    "name": "New York City",
    "boroughs": [
      "Manhattan",
      "Queens",
      "Brooklyn",
      "The Bronx",
      "Staten Island"],
    "population": 8491079,
    "area_codes": [212, 347, 646, 718, 917, 929],
    "position": { "lat": 40.7127, "lng": -74.0059 }
  }
  ```

  ```javascript
  const fs = require('fs');
  ```

  

- load data from web

  [Agile Manifesto](https://agilemanifesto.org/)

  - Writing with callbacks

  ```javascript
  // const readline = require("readline");
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  
  // rl.question("What is your name ? ", function(name) {
  //   rl.question("What's an activity you like doing ? ", function(activity) {
  //     rl.question("What do you listen to while doing that? ", function(music) {
  //       console.log(`My name is ${name}, and I am interested in ${activity} type of activity.`);
  //       rl.close();
  //     });
  //   });
  // });
  
  // rl.on("close", function() {
  //   console.log("\nThank you for checking my profile !!!");
  //   process.exit(0);
  // });
  
  // recalc using promises
  // question as a method. (name) -> instead of returnsing value
  // we can do this but adviced not to.
  // The order the function is running.
  // called callback hell or waterfallassert.closeTo(actual, expected, delta, "[message]"
  // lowering the nested situation.
  // promises use callbacks.
  
  // a massive object with lots of functions and constants
  // https://nodejs.org/api/fs.html
  // read file - readfile sync (in tests when people are testing causing stuck)
  const fs = require('fs');
  // console.log(fs);
  // reading file (function call)
  // readFile = fs.readFile('./data/p1.txt', 'utf-8', undefined);
  // fs.readFile('./data/p1.txt', 'utf-8', (err, data) => {
  //   console.log('data', data);
  //   console.log('err', err);
  // });
  
  let statements = [];
  
  let rvalue = fs.readFile('./data/p1.txt', 'utf-8', (err, p1) => {
    // second print
    // console.log('data', p1);
    // console.log('err', err);
    statements.push(p1);
  
    if (err) {
      return console.log('File 1 failed');
    }
  
    fs.readFile('./data/p2.txt', 'utf-8', (err, p2) => {
      // console.log('data', p2);
      statements.push(p2);
  
      fs.readFile('./data/p3.txt', 'utf-8', (err, p3) => {
        // console.log('data', p3);
        statements.push(p3);
  
        fs.readFile('./data/p4.txt', 'utf-8', (err, p4) => {
          // console.log('data', p4);
          statements.push(p4);
          // when you are done with the suncronized of events
          console.log('statements: ', statements);
  
        });
      });
    });
  });
  
  // first print
  // console.log('return value: ', rvalue);
  console.log('statements: ', statements);
  
  // const readline = require("readline-promise");
  // const rl = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
  
  ```

  [Npm readline promise. ](https://www.npmjs.com/package/readline-promise)

- When and why callback hell function happens?

- When a logic happens in a specific order, the logic is happening asyncronic 

- [Promises in Node](https://nodejs.org/api/fs.html#fs_fs_promises_api)

### Promises

- Promise is an object

- ```javascript
  Promise { <pending> }
  ```

- Current state in object and the behaviour is changing and getting update

- behaviour in the form of methods

- states: attributes or properties. 

- Start with the state, 

- Object: State and Result

- Start off as <pending>

- No result in the begining

- and then 2 paths can be taken:

  - Resolve (do resolve on a promise, the state of the promise changes to __resolve__ or __fulfilled__)

  - <fulfilled>

  - resuly

    

    Rejected ()

    1. <rejected>
    2. State Machine, 

- Summary: 

  - Primises are Objects
  - They are State Machines
  - They have a status starting with __Pending__.

How do we check to see what is happening? 

## Promise Behaviour

- Promises have .then method which take in one callback.
- These ,thens returns sth on which you can call ,then again. 
- Property.then (returns a Promise)
- .then can take promise 
- it will be a new promise
- The return value for a given .then callback is return as the value for the next promose. 
- .then is returning promise. 
- registeding callbacks
- If the return from the .then is a promise object, then the behaviour of that .the will be different
- a new promise it returns is a resolved value of the promise that was returned
- if wanna all the errors to cascade. 
- Is this priority Queue? 
- A queue exists for .thens.

### Promise Creation



// Week 2, Day4

1. JSON: 

   - built on two structures: 
     - a collection of name/value pairs
     - an ordered list of values

2. There are universal data structures. The data format that is interchangeable with programming langs also be based on these structures. 

   ```json
   {
     "name": "New York City",
     "boroughs": [
       "Manhattan",
       "Queens",
       "Brooklyn",
       "The Bronx",
       "Staten Island"],
     "population": 8491079,
     "area_codes": [212, 347, 646, 718, 917, 929],
     "position": { "lat": 40.7127, "lng": -74.0059 }
   }
   ```

   - Note that the keys are always double-quoted *"strings"*, and the *values* can be numbers, strings, or objects themselve

   ## Serialization

   - converts objects (or data structures) into a format that can be stored or transmitted between PCs. (typically as string or text).  

   - Going from String -> Object is called, deserilalization

   - In JavaScript we have the JSON object for serializing and deserializing. 

   - MDN 

     - JSON.parse()
       - Parse a srting as JSON. optionally transform the produced value and its properties and return a value. 
     - JSON.stringify()
       - Return a JSON string corresponding to the __specified value__. including only ceratin properties or replacing propert values in a user-defined manner. 

   - ### JSON Media Type

   - When data is sent across the web using HTTP request/responses, 

   - Media type for JSON data is application/JSON compared to text/html.

   - Content-Type HTTP response Header

   - ![image-20200116125530884](/Users/ladan/Library/Application Support/typora-user-images/image-20200116125530884.png)

- Media Type: application/json

- character Encoding: charset= 'utf-8'

- This indicates the media type and character encoding of the response body

  ## JSON for Configuration (package.json)

  - npm likes to add a package.json 
  - Text read from the file is string
  - NPM needs that info so it reads the file and parses it into an object using JSON object 

  XML popular format for exchanging data before JSON. 

  

  ## JSON > XML

  Before JSON became popular, XML was popular standard.

  

  ## JSON is Language Independent

  - Javascript Object Notation is used to store configuration/setting information. 
  - JSON.parse() and strinigify() 
  - to convert between actual object and string representation of the data.

  

## What is an API.

The presence of APIs (application programming interface)

- allows systems to work together. 
- As Isaac Newton: APIs Principles, best practices and limitations. 



- REST APIs: Representational Stand Transfer
- Make a call to a server
- ask JSON 
- http://maps.googleapis.com/maps/api/geocode/json
- ![image-20200116131036988](/Users/ladan/Library/Application Support/typora-user-images/image-20200116131036988.png)



```javascript
const request = require('request');
request('http://www.google.com', function (error, response, body) {
  console.error('error:', error);
  console.log('statusCode:', response && response.statusCode);
  console.log('body:', body);
})
```





## Custom HTTP Headers

HTTP headers such as User-Agent can be set in the options object

We want to call github API to find out the number of stars and forks for thr request repository.

```javascript
const request = require('request');

const options = {
  url: 'http://api.github/repos/reques'
}
```



Request is designed to be the simplest way possible to make http calls. 

It supports HTTPs and follows redirects by default.

```javascript
const request = require('request');
request('http://www.google.com', (error, response, body) => {
  console.error('error': error);
  console.log('statusCode:', response $$ response.statusCode);
  console.log('body:', body);
})
```

- created Node.js web server using the http API
- Make http requests on port 8080
- ![image-20200120131133595](/Users/ladan/Library/Application Support/typora-user-images/image-20200120131133595.png)

- Using cURL to fetch the URL

  ```zsh
  curl -i http://localhost:8080/hello
  ```

  ### Templates and using them in Express app

  - templates are files defining the presentation of a web app's data separately from the __server logic__
  - Defining the HTML of a particular page separetaly from the logic in the Express server. 
  - Templates usibility:
    - [1] Keeping server logic (JS) separate from markup (HTML)
    - [2] Making it easier to modify or debug one without affecting the other. 
    - [3] Separating different parts of an HTML document into different files,
    - [4] Keep the length of html short and managable.
    - [5] In order to use template files, a template engine is also needed. The template engine replaces variables in a tempate file with __actual data__ and transforms the template into an HTML file sent to the __client__ (the browser)
    - Implement your first template using __Embedded JavaScript (EJS)__ 
    - View templates, partials and passing data to views

  ## Use EJS to template your Node APP

  - [EJS]() 

  - Use EJS to include repeatable parts of your site (partials) and pass data to views.

  - Making two pages for our application:

    - One page (Full Width)

    - Sidebar

    - our templating inside of the views folder

    - Package.json will hold our Node application information and the dependency we need:

      - express
      - EJS
      - server.js will hold our Express server setup.
      - We will define our routes to our pages here.
      -  using the EJS template engine to render web pages.
      - It's only necessary to restart the server when we make changes to server files. Changes to front-end files (i.e. anything in our views directory) can be seen by refreshing the browser.

      ```javascript
      const urlDatabase = {
        "b2xVn2": "http://www.lighthouselabs.ca",
        "9sm5xK": "http://www.google.com"
      };
      
      app.get("/urls", (req, res) => {
          // how this route handler will look like
          // 
          let templateVars = { urls: urlDatabase };
          res.render("urls_index", templateVars);
        });
      ```

      

- we are following the Express convention of using a views directory

- useful EJS shortcut

- EJS automatically knows to look inside the views directory for any template file with extension __.ejs__

- No need to give path address. 

- No need to include the extension of the filename when referencing 

- Sending variables to an ESJ template , send them inside an __object__

- Even if we are only sending one variable

- This is so we can use the key of that variables (urls) -> to access the data within this template

  

- Fill the urls_index.js with a basic HTML
- EJS and  HTML
- A list or table of URLs and their shortened forma.
- loop through data with EJS

## Passing data to views

```javascript
// index page
app.get('/', (req, res) => {
  // we have created a list called drinks
  // and a simple string tagline
  // to echo a single variable we just use <%= tangline %>
  
  var drinks = [
    { name: 'Bloody Mary', drunkness: 3 },
    { name: 'Martini', drunkness: 5 },
    { name: 'Scotch', drunkness: 10 }
  ];
  
  var tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";
  
  res.render('/pages/index', {
    drinks: drinks,
    tangline: tangline
  });
});
```

```ejs
<!-- views/pages/index.ejs -->
<h2>Variable</h2>
<p><%= tagline %></p>

// loopint through data
<h2>Loop</h2>
<url>
  <% drinks.forEach((drink) => { %>
  	<li><%= drink.name %> - <%= drink.drunkness %</li>
      <% }); %>
  
  })
</url>
```

Notice that the name of this file starts with an underscore (_). This is to signify that it's a partial, in this case, a *header* partial.

In this exercise we learned how to use the EJS templating engine to render web pages.

We used the Express `render` method to respond to requests by sending back a template, along with an object containing the data the template needs. We then used `EJS` to render this data to our web page. We used Express *route parameters* to pass data from our frontend to our backend via the request url. Finally, we created a partial template for our header so that we can have the code for it in one location, but render it on multiple pages.

### CRUD and HTTP

- Web apps allow users to manipulate data in various ways.
- Which we typically break down into 4 categories:
  - Create:  add a new records
  - Read: retrieve value of record
  - Update: update record's value
  - Delete: delete a record
- We used a JavaScript Object users keys: User IDS
- Matching values = objects storing the user information.
- How we could perform CRUD operations on the users object
- ![image-20200120170636431](/Users/ladan/Library/Application Support/typora-user-images/image-20200120170636431.png)



- create multiple data enteries at the time, or to list data entries that match a ceratin condition.
- Most apps: Fancy user interface on top of databases.
- web applications: HTTP is the protocol used to facilitate communication between the interface and the database. in the case of web application, HTTP is the protocol used to facilitate communication between the inetraface and the database. (with browser and server in between)
- ![image-20200120171110649](/Users/ladan/Library/Application Support/typora-user-images/image-20200120171110649.png)
- HTTP : designed around the concept of resources (URLs)
- actions can taken on them.
- Take an actiona on a resource, a client (a browser) sends an __HTTP Request__ to a __Server__
- with appropriate URL and method.
- ![image-20200120171242127](/Users/ladan/Library/Application Support/typora-user-images/image-20200120171242127.png)

- use appropriate methods for each request for all CRUD actions
- play by the rules of HTTP, use the appropriate methods for each request.
- Safe request: no side effects on the server.
- We should use the GET method
- It would technically be possible to create a functional web application that only uses `GET` requests for all CRUD actions, but to play by the rules of HTTP we should use the appropriate methods for each request. This means that when we send a safe request to read some information (safe as in a request that should have no side effects on the server), we should use the `GET` method. When we send a request to create a resource we should use `POST`. When we update a resource in an idempotent way we should use `PUT`, otherwise when updating in a non-idempotent way we should use `POST`. If we are requesting to delete a resource, we should use `DELETE`.
- ecause links can only create `GET` requests and forms can only create `GET` and `POST` requests (for historical reasons).
- To create `PUT` and `DELETE` requests we would need to use a workaround known as *HTTP Method Override*, but for simplicity we will make do with just `GET` and `POST`. Instead of `PUT` and `DELETE`, we will use `POST`.

- The form tag has two important attributes:

  - [1] action: the action attribute tells the form which URL to submit to 
  - [2] method attribute tells the form which HTTP method to use when submitting the form.

- ```html
  <form class="form-inline" action="/urls" method="POST">
  ```

- The input tag has an important attribute as well: name

- name (attribute identifies the data we are sending)

- Here it adds the key longURL to the data we will be sending in the body of our POST request.

- ```html
  <input class="form-control" type="text" name="longURL" placeholder="http://" style="width: 300px; margin: 1em">
  ```

  ### Post requests

  - a POST request has a body, while a GET request does not. 

  - When our browser submits a POST request, 

  - the data in a request body is sent as __buffer__. 

  - this data type is great for transmitting data

    ```javascript
    const bodyParser = require("body-parser");
    app.use(bodyParser.urlencoded({extended: true}));
    ```

    Body-parser library:

    [1] convert the request body from a buffer into string that we can read.

    [2] add the data to the req (request) object under the key body

    [3] The data in the input field will be available to us in

    req.body.longURL

    - Store in our urlDatabase object.
    - Store these urls in a real database.
    - The form has one named input, with the name attribute set to longURL.

![image-20200121192329136](/Users/ladan/Library/Application Support/typora-user-images/image-20200121192329136.png)





In this activity we learned how to build a web form and how to send the form data to a backend API that creates shortened URLs.

We first created a form that allowed a user to input a `longURL` and send that data to our API via a POST request. We then created a route that would render this form when the user visited `/urls/new`. We also created a route to handle the *POST* requests from our form. We used the `body-parser` library to make the *POST* request body human readable and then finally we generated a random string to serve as our `shortURL`.

![image-20200120180338951](/Users/ladan/Library/Application Support/typora-user-images/image-20200120180338951.png)

![image-20200120180332076](/Users/ladan/Library/Application Support/typora-user-images/image-20200120180332076.png)

This activity demonstrates a common way for computers to communicate with each other: one computer makes a request and the other responds. In this case, our browser made the requests and our Express server responded to them.

- Now that we are persisting that data, let's send a more meaningful response back to the client (browser).
- Instead of just saying ok, let's tell the browser to go to a new page. respond with redirect.
- redirect the user to a new page that shows them the new link they created.

- We have an Express server that is able to handle POST requests set to __/urls__
- it generates a random string (our shortURL) and then responds with a 200 status code. 
- But then all of that data is lost.
- We need to save the __longURL__ and __shortURL__ to our __urlDatabase.
- Now that we are persisting that data, let's send a more meaningful response back to the client (browser)
- Let's tell the browser to go to the new page, respond with a __redirect__.
- Let's redirect the user to a new page that shows them the new link they created. 
- Update your express server so that when it receives a POST request to __/urls__, it responds with a
- redirection to /urls/:shortURL
- Where shortURL is the random string we generated. 



- send a more meaningful response back to the client (browser)
- Instead of just saying OK, Let's tell the browser to go to a new page.
- Respond with a redirect. Redirect the user to a new page that shows them the new link they created. 
- https://learngitbranching.js.org



![image-20200121193417625](/Users/ladan/Library/Application Support/typora-user-images/image-20200121193417625.png)

![image-20200121193608004](/Users/ladan/Library/Application Support/typora-user-images/image-20200121193608004.png)





![image-20200121193732176](/Users/ladan/Library/Application Support/typora-user-images/image-20200121193732176.png)



```javascript
const express = require("express");
const app = express();
const PORT = 8080;
const { generate } = require('./functions');

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.use(bodyParser.urlencoded({extended: true}));

app.set
```



```javascript
const express require('express');
const app = express();

const porr = (process.env.PORT || 8000;

app.listen(port)


```

enviromental variables: inserted in runtime

```zsh
npm init
npm i express
touch .gitignore
```

```javascript
// request
// response
// 
app.get('/', (req, res) => {
  res.send('hello world');
});

app.set('view engine', 'ejs');

const breadsAndSoups = {
  'abc': {
    style: 'sourdough',
    description: 'Andy\'s last fave'
  },
  'ghi': {
    style: 'phocaccio',
    description
  }
}

// Browse
app.get('/', (req, res) => {
  const templateVars = {
    breadsAndSoups
  }
})
```



- npm i ejs



## Create a registraction page

[1] Create a new template that includes a form with an __email address__ and __password field__.

[2] The email field should use __type=email__ and have __name=email__.

[3] The password field should use __type=password__ and __name=password__

[4] The form should POST to /register

[5] In express_server.js create a GET / register endpoint which returns the template you just created. 

```html
<!DOCTYLE html>
main style="margin: 1em;">
      <h3>Registration Page</h3>
      <form class="form" action="/register" method="POST">
        <div class="form-group mb-2">
          <input class="form-control" type="email" name="email" placeholder="email" style="width: 300px; margin: 1em">
          <input class="form-control" type="password" name="password" placeholder="password" style="width: 300px; margin: 1em">
          <button type="submit" class="btn btn-primary">Submit</button>
        </div>
      </form>
    </main>
```

```javascript
// Register
// for get methods we can use shortURLs '/register:shortURL'
// or we can use cookies
app.get('/register', (req, res) => {
  const username = req.cookies.username;
  const temptVars = {
    "username": username
  }
  res.render("register", temptVars)
})

// 

// Register
// Post methods 
// for post methods you can see req.body.username or any other data
app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  
  const temptVars = {
    "username": username,
    "email": email
  }
  res.redirect('/login');
})
```

### Create a Users Object

In order to store our users, we will need a "data store" similar to the one we use to store URLs.

[1] Create a global object called __users__ which will be used to store and access the users in the app.

[2] The data should be saved to look like this:

```javascript
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
```

#### Create a Registration Handler

- Let's create the __endpoint__ that __handles the registration from data__.

  ```javascript
  // create endpoint
  // handles registration from data
  // it means post method for register
  app.post('/register', (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    
    const temptVars = {
      "username": username,
      "email": email
    }
    res.redirect('/login');
  })
  ```

  

  [1] This endpoint should add a new user object to the global users object

  


















