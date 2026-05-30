const Ajv = require("ajv");
const ajv = new Ajv();

const krmivoDao = require("../../dao/krmivo-dao");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string" },
  },
  required: ["id", "name"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let krmivo = req.body;

    // validate input
    const valid = ajv.validate(schema, krmivo);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    krmivo.update_dt = new Date();
    // update krmivo in persistent storage
    let updatedKrmivo;
    try {
      updatedKrmivo = krmivoDao.update(krmivo);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updatedKrmivo) {
      res.status(404).json({
        code: "krmivoNotFound",
        message: `Krmivo with id ${krmivo.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updatedKrmivo);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
