const mappingDao = require("../../dao/krmivo-krmelec-mapping-dao");

async function ListAbl(req, res) {
  try {
    const mappingList = mappingDao.list();
    res.json({ itemList: mappingList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
