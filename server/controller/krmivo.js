const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/krmivo/getAbl");
const ListAbl = require("../abl/krmivo/listAbl");
const CreateAbl = require("../abl/krmivo/createAbl");
const UpdateAbl = require("../abl/krmivo/updateAbl");
const DeleteAbl = require("../abl/krmivo/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
