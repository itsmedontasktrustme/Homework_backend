const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const krmivoDao = require("./krmivo-dao");


const mappingFolderPath = path.join(__dirname, "storage", "mappingList");

function get(mappingId) {
  try {
    const filePath = path.join(mappingFolderPath, `${mappingId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadMapping", message: error.message };
  }
}

// Method to write a mapping to a file
function create(mapping) {
  try {
    const mappingList = list();
    if (mappingList.some((item) =>
        item.krmelecId === mapping.krmelecId
        && item.krmivoId === mapping.krmivoId)) {
      throw {
        code: "mappingAlreadyExists",
        message: "Tahle kombinace krmiva a krmeliste jiz existuje."
      };
    }
    mapping.id = crypto.randomBytes(16).toString("hex");
    if (!mapping.value) {
    mapping.value = "prazdno"
  }
    const filePath = path.join(mappingFolderPath, `${mapping.id}.json`);
    const fileData = JSON.stringify(mapping);
    fs.writeFileSync(filePath, fileData, "utf8");
    return mapping;
  } catch (error) {
    throw { code: "failedToCreateMapping", message: error.message };
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
          message: "Tahle kombinace krmiva a krmeliste jiz existuje.",
        };
      }
    }

    const newKrmivo = { ...currentKrmivo, ...krmivo };
    const filePath = path.join(mappingFolderPath, `${krmivo.id}.json`);
    const fileData = JSON.stringify(newKrmivo);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newKrmivo;
  } catch (error) {
    throw { code: "failedToUpdateKrmivo", krmivo: error.message };
  }
}

function remove(krmivoId) {
  try {
    const filePath = path.join(mappingFolderPath, `${krmivoId}.json`);
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
    const files = fs.readdirSync(mappingFolderPath);
    const mappingList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(mappingFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return mappingList;
  } catch (error) {
    throw { code: "failedToListMapings", message:error.message };
  }
}

// Method to list mappings by krmivoId
function listByKrmivoId(krmivoId) {
  const mappingList = list();
  return mappingList.filter((item) => item.krmivoId === krmivoId);
}

// Method to list mappings by krmelec
function listByKrmelecId(krmelecId) {
  const mappingList = list();

  const filteredMappings = mappingList.filter((item) => item.krmelecId === krmelecId);
  for (let i = 0; i < filteredMappings.length; i++) {
    const krmivo = krmivoDao.get(filteredMappings[i]['krmivoId']);
    console.log(krmivo['name']);
    filteredMappings[i]['name'] = krmivo['name'];
  }
  // return filteredMappings.filter((item) => item.krmelecId === krmelecId);
  return filteredMappings;
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
  listByKrmivoId,
  listByKrmelecId
};
