import { KrmivoContext } from "./krmivo-provider";
import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Icon from "@mdi/react";
import { mdiPlus, mdiLoading, mdiCheckBold, mdiDeleteOutline } from "@mdi/js";
import DeleteConfirmationDialog from "./delete-confirmation-dialog";

function Krmivo({ data }) {
  const { state, handlerMap } = useContext(KrmivoContext);
  const [name, setName] = useState(data?.name);
  const [showDeleteConfirmationDialog, setShowDeleteConfirmationDialog] =
    useState(false);

  const handleCreate = async () => {
    await handlerMap.handleCreate(name);
    setName("");
  };

  const handleUpdate = async () => {
    await handlerMap.handleUpdate(data.id, name);
  };

  return (
    <>
      {showDeleteConfirmationDialog && (
        <DeleteConfirmationDialog
          showDeleteConfirmationDialog={showDeleteConfirmationDialog}
          setShowDeleteConfirmationDialog={setShowDeleteConfirmationDialog}
          handleDelete={handlerMap.handleDelete}
        />
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "160px auto 84px",
          gap: 8,
          margin: "4px 0",
        }}
      >
        <div>
          <Form.Control
            type="text"
            placeholder="Název krmiva"
            buttons
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={
              state === "creating" ||
              (state.startsWith("updating_") &&
                state.split("_")[1] === data?.id)
            }
          />
        </div>
        <div>
          {!data?.id ? (
            <Button
              variant="success"
              onClick={() => {
                handleCreate();
              }}
              size="sm"
              disabled={
                !name ||
                state === "creating" ||
                (state.startsWith("updating_") &&
                  state.split("_")[1] === data?.id)
              }
            >
              <Icon
                path={state === "creating" ? mdiLoading : mdiPlus}
                size={1}
                spin={state === "creating"}
              />
            </Button>
          ) : (
            <>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  handleUpdate();
                }}
                disabled={data?.name === name }
              >
                <Icon
                  path={
                    state.startsWith("updating_") &&
                    state.split("_")[1] === data?.id
                      ? mdiLoading
                      : mdiCheckBold
                  }
                  size={1}
                  spin={
                    state.startsWith("updating_") &&
                    state.split("_")[1] === data?.id
                  }
                />
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => {
                  setShowDeleteConfirmationDialog(data);
                }}
              >
                <Icon path={mdiDeleteOutline} size={1} />
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Krmivo;
