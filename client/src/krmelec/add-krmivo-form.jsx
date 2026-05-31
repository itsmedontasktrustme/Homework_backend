import { useContext } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";

import { TransactionListContext } from "./krmelec-list-provider.jsx";

function KrmivoMappingCreateForm({ item, onClose }) {
  const { state, data, error, handlerMap } = useContext(TransactionListContext);

  let activeKrmelec =  null;
    for (let i = 0; i < data.itemList.length; i++) {
        if (data.itemList[i].id === item) {
            activeKrmelec = data.itemList[i];
        }
    }

  return (
    <Modal show={true} onHide={onClose}>
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          e.stopPropagation();

          const formData = new FormData(e.target);
          const values = Object.fromEntries(formData);
          values['krmelecId'] = activeKrmelec.id;


          let result;
            result = await handlerMap.handleCreateMapping({ ...values });
          if (result.ok) {
            onClose();
          }
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Přidat krmivo do krmelce {activeKrmelec.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {state === "error" ? (
            <Alert variant={"danger"}>{error}</Alert>
          ) : null}

          <Form.Label>Druh krmiva</Form.Label>
            {activeKrmelec['availableKrmivoList'].length > 0 ? (
          <Form.Select
            type="select"
            name="krmivoId"
            defaultValue={''}
            disabled={state === "pending"}
            required
          >
            {activeKrmelec['availableKrmivoList'].map((krmivo) => {
                  return (
                    <option key={krmivo.id} value={krmivo.id}>
                        {krmivo.name}
                    </option>
                  );
                })}
          </Form.Select>

            ): <div>Žádná krmiva nejsou k dizpoci, vytvořte nová, abyste je mohli přidat</div>}


          {/*<Form.Label>Hodnota</Form.Label>*/}
          {/*<Form.Control*/}
          {/*  type="text"*/}
          {/*  name="value"*/}
          {/*  defaultValue={item?.value}*/}
          {/*  disabled={state === "pending"}*/}
          {/*  required*/}
          {/*/>*/}

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
            disabled={((state === "pending") |  (activeKrmelec['availableKrmivoList'].length === 0))}
          >
            Uložit
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default KrmivoMappingCreateForm;
