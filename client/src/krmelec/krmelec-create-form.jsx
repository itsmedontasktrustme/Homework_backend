import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { TransactionListContext } from "./krmelec-list-provider.jsx";

function KrmelecCreateForm({ item, onClose }) {
  const { state, data, error, handlerMap } = useContext(TransactionListContext);

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);

          let result;
          if (item?.id) {
            result = await handlerMap.handleUpdate({
              id: item.id,
              ...values,
            });
          } else {
            result = await handlerMap.handleCreate({ ...values });
          }
          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>{item?.id ? "Upravit" : "Přidat"} krmelec</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error}</Alert>
          ) : null}
          <Form.Label>Název krmelce</Form.Label>
          <Form.Control
            type="text"
            name="name"
            defaultValue={item?.name}
            disabled={state === "pending"}
            required
          />

        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={state === "pending"}
          >
            Zavřít
          </Button>
          <Button
            variant="primary"
            type="submit"
            disabled={state === "pending"}
          >
            Uložit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default KrmelecCreateForm;
