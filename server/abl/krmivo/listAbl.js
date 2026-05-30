const krmivoDao = require("../../dao/krmivo-dao");

async function ListAbl(req, res) {
  try {
    const krmivoList = krmivoDao.list();
    res.json({ itemList: krmivoList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
