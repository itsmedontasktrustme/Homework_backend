const Ajv = require("ajv");
const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao");
const krmelecDao = require("../../dao/krmelec-dao");
const krmivoDao = require("../../dao/krmivo-dao");

const schema = {
  type: "object",
  properties: {
    krmelecId: { type: "string",},
    krmivoId: { type: "string",},
    value: { type: "string",},
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

    const krmelec = krmelecDao.get(data.krmelecId);
    if (!krmelec) {
      return res.status(404).json({ error: "krmelecNotFound", message: `Krmelec with id '${data.krmelecId}' not found` });
    }

    const krmivo = krmivoDao.get(data.krmivoId);
    if (!krmivo) {
      return res.status(404).json({ error: "krmivoNotFound", message: `Krmivo with id '${data.krmivoId}' not found` });
    }

    const mapping = mappingDao.create(data);

    res.send(mapping);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = createAbl;
