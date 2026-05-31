import { createContext, useState, useEffect } from "react";

export const KrmivoContext = createContext();

const KrmivoProvider = ({ children }) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [state, setState] = useState();

  console.log(state);


  // TODO
  const fetchKrmivas = async () => {
    setState("loading");
    const response = await fetch("/krmivo/list");
    if (response.ok) {
      const data = await response.json();
      setData(data);
      setState("success");
    } else {
      setError(response.statusText);
      setState("error");
    }
  };

  useEffect(() => {
    fetchKrmivas();
  }, []);

  const handleCreate = async (name) => {
    setState("creating");
    const response = await fetch("/krmivo/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });


    if (response.ok) {
      const newKrmivo = await response.json();
      setData((currentData) => {
        currentData.itemList.push(newKrmivo);
        return { ...currentData };
      });
      setState("success");
    } else {
      setError(response.statusText);
      setState("errorCreating");
    }
  };

  const handleUpdate = async (id, name) => {
    setState("updating_" + id);
    const response = await fetch("/krmivo/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, name }),
    });

    if (response.ok) {
      const newKrmivo = await response.json();
      setData((currentData) => {
        const itemIndex = currentData.itemList.findIndex(
          (item) => item.id === id
        );
        currentData.itemList[itemIndex] = newKrmivo;
        return { ...currentData };
      });
      setState("success");
    } else {
      setError(response.statusText);
      setState("errorCreating");
    }
  };

  // TODO this is not used to delete mapping!
  const handleDelete = async (id) => {
    setState("deleting_" + id);
    const response = await fetch("/mapping/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const responseData = await response.json();

    if (response.ok) {
      setData((currentData) => {
        const itemIndex = currentData.itemList.findIndex(
          (item) => item.id === id
        );
        currentData.itemList.splice(itemIndex, 1);
        return { ...currentData };
      });
      setState("success");
    } else {
      setError(responseData['message']);
      console.log(responseData)
      setState("errorDeleting");
    }
  };

  return (
    <KrmivoContext.Provider
      value={{
        data,
        state,
        error,
        handlerMap: {
          handleCreate,
          handleUpdate,
          handleDelete,
          fetchKrmivas: fetchKrmivas,
        },
      }}
    >
      {children}
    </KrmivoContext.Provider>
  );
};

export default KrmivoProvider;
