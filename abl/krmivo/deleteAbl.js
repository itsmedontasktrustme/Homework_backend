const Ajv = require("ajv");
const ajv = new Ajv();
const krmivo = require("../../dao/krmivo-dao");
const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    const reqParams = req.body;

    // validate input
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // check there is no mapping related to given krmivo
    const mappingList = mappingDao.listByKrmivoId(reqParams.id);
    if (mappingList.length) {
      res.status(400).json({
        code: "mappingWithKrmivo",
        message: "krmivo is mapped to krmelec and cannot be deleted",
        validationError: ajv.errors,
      });
      return;
    }

    // remove krmivo from persistant storage
    krmivo.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;
