const app = require("./app");
const http = require("http");
const { PORT } = require("./utils/config");

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`connected on ${PORT}`);
});
