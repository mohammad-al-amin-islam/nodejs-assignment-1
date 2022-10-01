const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");

app.use(express.json());

fs.readFile("data.json", "utf-8", (err, data) => {
  const info = JSON.parse(data);

  app.get("/user/random", (req, res) => {
    let x = Math.floor(Math.random() * 10 + 1);
    const data = info[x];
    res.send(data);
  });

  app.get("/user/all", (req, res) => {
    res.send(data);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Server is running on the port", port);
});
