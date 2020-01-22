const express = require('express');
const app = express();

// env variables inserted at Run Time. 
// you wanna make sure to protect passwords (using env)
// access a key on the object
// logical or -> default values in JavaScript
// npm install express
// npm init

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`server is listening on port ${port}`);
});