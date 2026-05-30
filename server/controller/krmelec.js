const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/krmelec/getAbl");
const ListAbl = require("../abl/krmelec/listAbl");
const CreateAbl = require("../abl/krmelec/createAbl");
const UpdateAbl = require("../abl/krmelec/updateAbl");
const DeleteAbl = require("../abl/krmelec/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
