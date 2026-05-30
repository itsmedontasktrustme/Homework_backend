const Ajv = require("ajv");
const ajv = new Ajv();

const krmelecDao = require("../../dao/krmelec-dao");

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
    let krmelec = req.body;

    // validate input
    const valid = ajv.validate(schema, krmelec);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    krmelec.update_dt = new Date();

    // update krmelec in persistent storage
    let updateKrmelec;
    try {
      updateKrmelec = krmelecDao.update(krmelec);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }
    if (!updateKrmelec) {
      res.status(404).json({
        code: "krmelecNotFound",
        message: `Krmelec with id ${krmelec.id} not found`,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(updateKrmelec);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;
