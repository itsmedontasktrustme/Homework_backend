const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao");

const schema = {
  type: "object",
  properties: {
    krmelecId: { type: "string",},
    krmivoId: { type: "string",},
    stateId: { type: "string",},
  },
  required: ["krmelecId", "krmivoId"],
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

    data.krmelecId = data.krmelecId.trim();
    data.krmivoId = data.krmivoId.trim();

    const mapping = mappingDao.create(data);

    res.send(mapping);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = createAbl;
