const express = require("express");
const app = express();
const port = 8888;

const krmivoController = require("./controller/krmivo");
const krmelecController = require("./controller/krmelec");
const mappingController = require("./controller/mapping");

app.use(express.json()); // podpora pro application/json
app.use(express.urlencoded({ extended: true })); // podpora pro application/x-www-form-urlencoded

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/krmivo", krmivoController);
app.use("/krmelec", krmelecController);
app.use("/mapping", mappingController);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
