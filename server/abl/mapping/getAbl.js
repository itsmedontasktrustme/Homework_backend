const Ajv = require("ajv");
const ajv = new Ajv();
const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    // get request query or body
    const reqParams = req.query?.id ? req.query : req.body;

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

    const mapping = mappingDao.get(reqParams.id);
    if (!mapping) {
      res.status(404).json({
        code: "mappingNotFound",
        message: `Krmelec-Krmivo mapping with id ${reqParams.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(mapping);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;
