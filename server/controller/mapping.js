const express = require("express");
const router = express.Router();

const GetAbl = require("../abl/mapping/getAbl");
const ListAbl = require("../abl/mapping/listAbl");
const CreateAbl = require("../abl/mapping/createAbl");
const UpdateAbl = require("../abl/mapping/updateAbl");
const DeleteAbl = require("../abl/mapping/deleteAbl");

router.get("/get", GetAbl);
router.get("/list", ListAbl);
router.post("/create", CreateAbl);
router.post("/update", UpdateAbl);
router.post("/delete", DeleteAbl);

module.exports = router;
