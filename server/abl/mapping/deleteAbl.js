const Ajv = require("ajv");
const ajv = new Ajv();
const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao.js");

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

    // remove mapping from persistant storage
    mappingDao.remove(reqParams.id);

    // return properly filled dtoOut
    res.json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({ mapping: e.message }); // TOOD check this please
  }
}

module.exports = DeleteAbl;
