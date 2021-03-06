const bcrypt = require('bcrypt');


function generate_random_string(string_length){
    let random_string = '';
    let random_ascii;
    let ascii_low = 65;
    let ascii_high = 90
    for(let i = 0; i < string_length; i++) {
        random_ascii = Math.floor((Math.random() * (ascii_high - ascii_low)) + ascii_low);
        random_string += String.fromCharCode(random_ascii)
    }
    return random_string
}

function generate_random_number(){
    let num_low = 1;
    let num_high = 9;
    return Math.floor((Math.random() * (num_high - num_low)) + num_low);
}

function generate() {
    return generate_random_string(6) + generate_random_number()
}

function checkEmailInUsers(users, email,) {
    for (let userID in users) {
        if (users[userID].email === email) {
            return userID;
        }
    }
    return undefined;
}

function checkEmailAndPasswordInUsers(users, email, password) {
    for (let userID in users) {
        if (users[userID].email === email && users[userID].password === passwrord) {
            return userID;
        }
    }
    return undefined;
}

function getUserByEmail(email, users) {
    // lookup magic...
    for (let userID in users) {
        if (users[userID].email === email) {
            return users[userID];
        }
    }
};


module.exports = { generate,
                   checkEmailAndPasswordInUsers,
                   checkEmailInUsers,
                   getUserByEmail };