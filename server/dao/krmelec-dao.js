const { listByKrmelecId } = require("./krmivo-krmelec-mapping-dao");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const krmelecFolderPath = path.join(__dirname, "storage", "krmelecList");
const mappingFolderPath = path.join(__dirname, "storage", "mappingList");

function get(krmelecId) {
  try {
    const filePath = path.join(krmelecFolderPath, `${krmelecId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadKrmelec", message: error.json };
  }
}

const krmelecSeStejnymJmenemUzExistuje = "Krmelec se stejnym jmenem uz existuje.";
function create(krmelec) {
  try {
    const krmelecList = list();
    if (krmelecList.some((item) => item.name === krmelec.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: krmelecSeStejnymJmenemUzExistuje
      };
    }
    krmelec.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(krmelecFolderPath, `${krmelec.id}.json`);
    const fileData = JSON.stringify(krmelec);
    fs.writeFileSync(filePath, fileData, "utf8");
    return krmelec;
  } catch (error) {
    throw { code: "failedToCreateKrmelec", message: error.message };
  }
}

function update(krmelec) {
  try {
    const currentKrmelec = get(krmelec.id);
    if (!currentKrmelec) return null;

    if (krmelec.name && krmelec.name !== currentKrmelec.name) {
      const krmelecList = list();
      if (krmelecList.some((item) => item.name === krmelec.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: krmelecSeStejnymJmenemUzExistuje,
        };
      }
    }

    const newKrmelec = { ...currentKrmelec, ...krmelec };
    const filePath = path.join(krmelecFolderPath, `${krmelec.id}.json`);
    const fileData = JSON.stringify(newKrmelec);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newKrmelec;
  } catch (error) {
    throw { code: "failedToUpdateKrmelec", message: error.message };
  }
}

function remove(krmelecId) {
  try {
    const filePath = path.join(krmelecFolderPath, `${krmelecId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveKrmelec", message: error.json };
  }
}

function list() {
  try {
    const files = fs.readdirSync(krmelecFolderPath);
    const krmelecList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(krmelecFolderPath, file),
        "utf8"
      );
      let krmelecJson = JSON.parse(fileData);
      const mapping = listByKrmelecId(krmelecJson['id'])
      krmelecJson['krmivoList'] = mapping;

      return krmelecJson;

    });
    return krmelecList;
  } catch (error) {
    throw { code: "failedToListKmelec", message :error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
