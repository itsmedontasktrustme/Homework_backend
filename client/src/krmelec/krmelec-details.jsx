import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/Button";

import KrmivoItem from "./krmivo-item";

function KrmelecDetail({
                            eventKey,
                            name,
                            itemList = [],
                            onDelete, // function provided by parent
                           setkrmivoMappingUpdateDialog,
                           setKrmivoMappingDeleteDialog,
                           setkrmivoMappingCreateDialog,
                        }) {

    return (
        <Accordion.Item eventKey={eventKey} style={{ width: "100%" }}>
            <Accordion.Header className="p-0">
                <Stack direction="horizontal" gap={2}>
                    <div>{name}</div>
                </Stack>
            </Accordion.Header>
            <Accordion.Body style={{ display: "flex", flexDirection: "column" }}>
                {/* growable content area */}
                <div style={{ flex: 1 }}>
                    {itemList?.length > 0 ? (
                        itemList.map((item) => (
                            <Row key={item.id}>
                                <KrmivoItem
                                    item={item}
                                    setkrmivoMappingUpdateDialog={setkrmivoMappingUpdateDialog}
                                    setKrmivoMappingDeleteDialog={setKrmivoMappingDeleteDialog}
                                />
                            </Row>
                        ))
                    ) : (
                        <div>Krmelec neobsahuje žádné krmivo</div>
                    )}
                </div>

                {/* footer - always at the bottom */}
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 8 }}>
                    <Button size="sm" variant="outline-primary" onClick={() => setkrmivoMappingCreateDialog(eventKey)}>
                        Přidat krmivo
                    </Button>
                </div>
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default KrmelecDetail;
