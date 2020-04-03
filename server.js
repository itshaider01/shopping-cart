const http = require("http");
const port = process.env.PORT || 5000;
const app = require("./app");
const uuid = require("uuid");
const server = http.createServer(app);

app.use((req, res, next) => {
  console.log(`Server started at port ${port}`);
  next();
});

server.listen(port);
