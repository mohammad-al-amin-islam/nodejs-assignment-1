const { query } = require("express");
const express = require("express");
const app = express();
const port = 5000;
const fs = require("fs");

app.use(express.json());

fs.readFile("data.json", "utf-8", (err, data) => {
  const info = JSON.parse(data);

  //get random data
  app.get("/user/random", (req, res) => {
    let x = Math.floor(Math.random() * 10 + 1);
    const data = info[x];
    res.send(data);
  });

  //get all data
  app.get("/user/all", (req, res) => {
    res.send(data);
  });

  //post new data
  app.post("/user/save", (req, res) => {
    const data = req.body;
    info.push(data);
    res.send(info);
  });

  //update  information
  app.patch("/user/update/:id", (req, res) => {
    const id = req.params.id;
    const data = req.body;

    const result = info.find((single) => single.id === id);

    result.name = data.name;
    result.address = data.address;

    res.send(result);
  });

  //updating bulk data
  app.patch("/user/bulk-update", (req, res) => {
    const id1 = req.query.id1;
    const id2 = req.query.id2;
    const data = req.body;
    const result = info.find((single) => single.id == id1);
    const result2 = info.find((single) => single.id == id2);

    result.name = data[0].name;
    result2.name = data[1].name;

    res.send({ result, result2 });
  });

  //delete data;
  app.delete("/user/delete/:id", (req, res) => {
    const id = req.params.id;
    const result = info.filter((single) => single.id != id);

    res.send(result);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log("Server is running on the port", port);
});
