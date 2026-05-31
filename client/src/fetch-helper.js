async function Call(baseUri, useCase, dtoIn, method) {
  // return fetch
  let response;
  if (!method || method === "get") {
    response = await fetch(
      `${baseUri}/${useCase}${
        dtoIn && Object.keys(dtoIn).length
          ? `?${new URLSearchParams(dtoIn)}`
          : ""
      }`
    );
  } else {
    response = await fetch(`${baseUri}/${useCase}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dtoIn),
    });
  }
  const data = await response.json();
  return { ok: response.ok, status: response.status, data };
}

const baseUri = "http://localhost:3000";

const FetchHelper = {
  krmelec: {
    list: async (dtoIn) => {
      return await Call(baseUri, "krmelec/list", dtoIn, "get");
    },
    create: async (dtoIn) => {
      return await Call(baseUri, "krmelec/create", dtoIn, "post");
    },
    update: async (dtoIn) => {
      return await Call(baseUri, "krmelec/update", dtoIn, "post");
    },
    delete: async (dtoIn) => {
      return await Call(baseUri, "krmelec/delete", dtoIn, "post");
    },
    createMapping: async (dtoIn) => {
      return await Call(baseUri, "mapping/create", dtoIn, "post");
    },
    updateKrmivoMapping: async (dtoIn) => {
      return await Call(baseUri, "mapping/update", dtoIn, "post");
    },
    deleteKrmivoMapping: async (dtoIn) => {
      return await Call(baseUri, "mapping/delete", dtoIn, "post");
    },
  },
};

export default FetchHelper;
