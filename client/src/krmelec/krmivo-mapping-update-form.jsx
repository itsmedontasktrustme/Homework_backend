import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { TransactionListContext } from "./krmelec-list-provider.jsx";

function KrmivoMappingUpdateForm({ item, onClose }) {
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
            result = await handlerMap.handleUpdateKrmivoMapping({
              id: item.id,
              parentId: item.krmelecId,
              value: values.value,
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
          <Modal.Title>{item?.id ? "Upravit" : "Přidat"} krmivo pro krmelec</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error}</Alert>
          ) : null}
          <Form.Label column="foo">Hodnota</Form.Label>
          <Form.Control
            type="text"
            name="value"
            defaultValue={item?.value}
            disabled={state === "pending"}
            required
          />

          {/*<Form.Label>Kategorie</Form.Label>*/}
          {/*<Form.Select*/}
          {/*  type="select"*/}
          {/*  name="categoryId"*/}
          {/*  defaultValue={item?.categoryId}*/}
          {/*  disabled={state === "pending"}*/}
          {/*  required*/}
          {/*>*/}
          {/*  {data?.categoryMap*/}
          {/*    ? Object.keys(data.categoryMap).map((categoryId) => {*/}
          {/*        return (*/}
          {/*          <option key={categoryId} value={categoryId}>*/}
          {/*            {data.categoryMap[categoryId].name}*/}
          {/*          </option>*/}
          {/*        );*/}
          {/*      })*/}
          {/*    : null}*/}
          {/*</Form.Select>*/}
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

export default KrmivoMappingUpdateForm;
