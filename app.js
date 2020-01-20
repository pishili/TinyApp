// create a basic web server using http that accepts GET and POST requests
// on a single endpoint
// create not just an HTTP client but also HTTP Servers

// Server Example
// 7621

const http = require("http");
const PORT = 8080;

// a function which handles requests and sends response
// the callback recieves request and response arguments.
// we read values from the request, and send a string back
// to the client using the response object
const requestHandler = function(request, response) {
  if (request.url == "/") {
    response.end("Welcome!");
  } else if (request.url == "/urls") {
    response.end("www.lighthouselabs.ca\nwww.google.com");
  } else {
    response.statusCode = 404;
    response.end("404 Page Not Found");
  }
  // console.log('In requestHandler'); // NEW LINE
  // response.end(`Requested Path: ${request.url}\nRequest Method: ${request.method}`);
};

// requestHandler is registered as a callback function 
// that we register with the http module via its createServer function

const server = http.createServer(requestHandler);
console.log('Server created');

server.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

console.log('Last line (after .listen call)');