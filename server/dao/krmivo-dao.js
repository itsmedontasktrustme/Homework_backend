const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const krmivoFolderPath = path.join(__dirname, "storage", "krmivoList");

function get(krmivoId) {
  try {
    const filePath = path.join(krmivoFolderPath, `${krmivoId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadKrmivo", message: error.message };
  }
}

const krmivoSeStejnymJmenemUzExistuje = "Krmivo se stejnym jmenem uz existuje,";
function create(krmivo) {
  try {
    const krmivoList = list();
    if (krmivoList.some((item) => item.name === krmivo.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: krmivoSeStejnymJmenemUzExistuje
      };
    }
    krmivo.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(krmivoFolderPath, `${krmivo.id}.json`);
    const fileData = JSON.stringify(krmivo);
    fs.writeFileSync(filePath, fileData, "utf8");
    return krmivo;
  } catch (error) {
    throw { code: "failedToCreateKrmivo", message: error };
  }
}

function update(krmivo) {
  try {
    const currentKrmivo = get(krmivo.id);
    if (!currentKrmivo) return null;

    if (krmivo.name && krmivo.name !== currentKrmivo.name) {
      const krmivoList = list();
      if (krmivoList.some((item) => item.name === krmivo.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: krmivoSeStejnymJmenemUzExistuje,
        };
      }
    }

    const newKrmivo = { ...currentKrmivo, ...krmivo };
    const filePath = path.join(krmivoFolderPath, `${krmivo.id}.json`);
    const fileData = JSON.stringify(newKrmivo);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newKrmivo;
  } catch (error) {
    throw { code: "failedToUpdateKrmivo", message: error.message };
  }
}

function remove(krmivoId) {
  try {
    const filePath = path.join(krmivoFolderPath, `${krmivoId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveKrmivo", message:error.message };
  }
}

function list() {
  try {
    const files = fs.readdirSync(krmivoFolderPath);
    const krmivoList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(krmivoFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return krmivoList;
  } catch (error) {
    throw { code: "failedToListKrmivo", message:error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};
