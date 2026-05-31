import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import Icon from "@mdi/react";
import { mdiPencilOutline, mdiClose } from "@mdi/js";

function KrmivoItem({
  item,
  setTransactionItemFormData,
  setTransactionItemDeleteDialog,
}) {
  return (
    <Col>
      <Card>
        <Card.Body>
          <div style={{ position: "relative" }}>
            {item.name} : {item.value}
            <div style={{ position: "absolute", top: "0", right: "0" }}>
              <Button
                className="border-0 p-1"
                variant="outline-primary"
                size="sm"
                onClick={() => setTransactionItemFormData(item)}
              >
                <Icon path={mdiPencilOutline} size={0.8} />
              </Button>
              <Button
                className="border-0 p-1"
                variant="outline-danger"
                size="sm"
                onClick={() => setTransactionItemDeleteDialog(item)}
              >
                <Icon path={mdiClose} size={0.8} />
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default KrmivoItem;
