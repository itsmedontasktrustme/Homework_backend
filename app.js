const express = require("express");
const app = express();
const port = 8888;

const krmivoController = require("./controller/krmivo");
const krmelecController = require("./controller/krmelec");
const mappingController = require("./controller/mapping");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/krmivo", krmivoController);
app.use("/krmelec", krmelecController);
app.use("/mapping", mappingController);

app.listen(port, () => {
  console.log(`Backend appky na trackovani krmiv v krmelcich bezi na portu ${port}`);
});
