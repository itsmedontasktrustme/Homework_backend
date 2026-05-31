import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Stack from "react-bootstrap/esm/Stack";

import KrmivoItem from "./krmivo-item";

function KrmelecDetail({
                            eventKey,
                            name,
                            itemList = [],
                            onDelete, // function provided by parent
                           setkrmivoMappingUpdateDialog,
                           setKrmivoMappingDeleteDialog,
                        }) {

    return (
        <Accordion.Item eventKey={eventKey} style={{ width: "100%" }}>
            <Accordion.Header className="p-0">
                <Stack direction="horizontal" gap={2}>
                    <div>{name}</div>
                </Stack>
            </Accordion.Header>
            <Accordion.Body>
                {/* TODO: dropdown for adding krmivo if no krmivo is assigned */}
                {itemList?.length > 0 ? (
                    itemList.map((item) => (
                        <Row>
                            <KrmivoItem
                                item={item}
                                setkrmivoMappingUpdateDialog={setkrmivoMappingUpdateDialog}
                                setKrmivoMappingDeleteDialog={setKrmivoMappingDeleteDialog}
                            />
                        </Row>
                    ))
                ) : (
                    <div>No krmivo assigned</div>
                )}
            </Accordion.Body>
        </Accordion.Item>
    );
}

export default KrmelecDetail;
