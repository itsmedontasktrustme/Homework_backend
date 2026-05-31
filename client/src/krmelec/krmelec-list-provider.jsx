import {createContext, useEffect, useState} from "react";

import FetchHelper from "../fetch-helper.js";

export const TransactionListContext = createContext();

function KrmelecListProvider({ children }) {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [transactionListDto, setTransactionListDto] = useState({
    state: "ready", // one of ready/pending/error
    data: null,
    error: null,
  });

  async function handleLoad() {
    setTransactionListDto((current) => {
      return { ...current, data: undefined, state: "pending" };
    });
    const result = await FetchHelper.krmelec.list();

    setTransactionListDto((current) => {
      if (result.ok) {
        return { ...current, state: "ready", data: result.data, error: null };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
  }

  /* eslint-disable */
  useEffect(() => {
    handleLoad();
  }, []);
  /* eslint-enable */

  async function handleCreate(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.krmelec.create(dtoIn);
    setTransactionListDto((current) => {
      if (result.ok) {
        handleLoad();
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data.error };
      }
    });
    return { ok: result.ok, error: result.data.error ? undefined : "create failed" };
  }

  async function handleUpdate(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.krmelec.update(dtoIn);
    setTransactionListDto((current) => {
      if (result.ok) {

        handleLoad();
        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleUpdateKrmivoMapping(dtoIn) {
    setTransactionListDto((current) => {
      return {...current, state: "pending", pendingId: dtoIn.id};
    });

    const result = await FetchHelper.krmelec.updateKrmivoMapping(
        {
          id: dtoIn.id,
          value: dtoIn.value
        }
    );

    setTransactionListDto((current) => {
      if (result.ok) {
        handleLoad();

        return {
          ...current,
          state: "ready",
          data: {...current.data, itemList: current.data.itemList.slice()},
          error: null,
          pendingId: undefined,
        };
      } else {
        return {
          ...current,
          state: "error",
          error: result.data,
          pendingId: undefined,
        };
      }
    });
    return {ok: result.ok, error: result.ok ? undefined : result.data};
  }

  async function handleDeleteKrmelec(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.krmelec.delete({"id": dtoIn.id});

    setTransactionListDto((current) => {
      if (result.ok) {

        handleLoad();

        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleDeleteMapping(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending", pendingId: dtoIn.id };
    });
    const result = await FetchHelper.krmelec.deleteKrmivoMapping({"id": dtoIn.id});

    setTransactionListDto((current) => {
      if (result.ok) {

        handleLoad();

        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data };
      }
    });
    return { ok: result.ok, error: result.ok ? undefined : result.data };
  }

  async function handleCreateMapping(dtoIn) {
    setTransactionListDto((current) => {
      return { ...current, state: "pending" };
    });
    const result = await FetchHelper.krmelec.createMapping(dtoIn);
    setTransactionListDto((current) => {
      if (result.ok) {
        handleLoad()

        return {
          ...current,
          state: "ready",
          data: { ...current.data, itemList: current.data.itemList.slice() },
          error: null,
        };
      } else {
        return { ...current, state: "error", error: result.data.error };
      }
    });
    return { ok: result.ok, error: result.data.error ? undefined : "create failed" };
  }

  const value = {
    ...transactionListDto,
    selectedMonth,
    setSelectedMonth,
    handlerMap: {
      handleLoad,
      handleCreate,
      handleUpdate,
      handleDeleteMapping,
      handleUpdateKrmivoMapping,
      handleCreateMapping,
      handleDeleteKrmelec,
    },
  };

  return (
    <TransactionListContext.Provider value={value}>
      {children}
    </TransactionListContext.Provider>
  );
}

export default KrmelecListProvider;
