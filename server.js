const http = require("http");
const handleRequest = require("./app");

const server = http.createServer((req, res) => {

   handleRequest(req,res)

});

const port = process.env.PORT || 3000;
server.listen(port);