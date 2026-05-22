const krmelecDao = require("../../dao/krmelec-dao");

async function ListAbl(req, res) {
  try {
    const krmelecList = krmelecDao.list();
    res.json({ itemList: krmelecList });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;
