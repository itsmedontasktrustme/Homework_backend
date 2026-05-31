import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {useContext} from "react";
import {TransactionListContext} from "./krmelec-list-provider";

function DeleteKrmelecConfirmationDialog({
 item,
 onClose,
}) {
    const { state, handlerMap } = useContext(TransactionListContext);

    const handleDelete = async () => {
        if (!item?.id) return;
        const result = handlerMap?.handleDeleteKrmelec({ id: item.id });
        if (result && typeof result.then === "function") {
            try {
                await result;
            } catch (e) {
                // handle error if needed
            }
        }
        onClose();
    };

  return (
      <Modal show={!!item} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Opravdu chceš smazat tento krmelec?</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>Krmelec bude smazán.</p>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Zrušit
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
        >
          Smazat
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteKrmelecConfirmationDialog;
