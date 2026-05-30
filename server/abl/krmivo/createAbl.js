const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const krmivoDao = require("../../dao/krmivo-dao");

const schema = {
  type: "object",
  properties: {
    name: { type: "string", maxLength: 250 },
  },
  required: ["name"],
  additionalProperties: false,
};

const validate = ajv.compile(schema);

function createAbl(req, res) {
  try {
    const data = req.body;

    const valid = validate(data);
    if (!valid) {
      return res.status(400).json({ error: validate.errors });
    }

    data.name = data.name.trim();
    data.create_dt = new Date();
    data.update_dt = new Date();

    const krmivo = krmivoDao.create(data);

    res.send(krmivo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = createAbl;
