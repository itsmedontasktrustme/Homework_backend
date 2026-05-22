const Ajv = require("ajv");
const ajv = new Ajv();

const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    value: { type: "string" },
  },
  required: ["id", "value"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let mapping = req.body;

    // validate input
    const valid = ajv.validate(schema, mapping);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    let updatedMapping;
    try {
      updatedMapping = mappingDao.update(mapping);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedMapping) {
      res.status(404).json({
        code: "mappingNotFound",
        message: `Mapping with id ${mapping.id} not found`,
      });
      return;
    }

    res.json(updatedMapping);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
