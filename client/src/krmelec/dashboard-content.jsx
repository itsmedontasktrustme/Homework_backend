// client/src/krmelec/dashboard-content.jsx
import { useContext, useMemo, useState } from "react";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";

import Icon from "@mdi/react";
import { mdiCashPlus, mdiSigma } from "@mdi/js";

import { TransactionListContext } from "./krmelec-list-provider";
import PendingItem from "./pending-item";
import TransactionItemForm from "./transaction-item-form";
import MappingDeleteDialog from "./mapping-delete-dialog";
import KrmelecDetails from "./krmelec-details";

function DashboardContent() {
  const [transactionItemFormData, setKrmelecItemFormData] = useState();
  const [transactionItemDeleteDialog, setTransactionItemDeleteDialog] =
      useState();
  const { state, data, selectedMonth, setSelectedMonth } = useContext(
      TransactionListContext
  );

  // control which Accordion item is open (only one at a time)
  const [activeKey, setActiveKey] = useState(null);

  const dashboardData = useMemo(() => {
    const result = {
      krmelecEntries: [], // flattened list of all revenue items
    };

    data?.itemList?.forEach((item) => {
        result.krmelecEntries.push(item);
    });

    console.log(result);

    return result;
  }, [data]);

  return (
      <Card className="border-0 ">
        {!!transactionItemFormData ? (
            <TransactionItemForm
                item={transactionItemFormData}
                onClose={() => setKrmelecItemFormData()}
            />
        ) : null}
        {!!transactionItemDeleteDialog ? (
            <MappingDeleteDialog
                item={transactionItemDeleteDialog}
                onClose={() => setTransactionItemDeleteDialog()}
            />
        ) : null}
        <Card.Header
            className="sticky-top "
            bsPrefix="bg-white"
            style={{ top: "56px", padding: "8px" }}
        >
          <Stack direction="horizontal" gap={3}>
            <div className="ms-auto">
              <Button
                  id="myButton"
                  variant="success"
                  size="sm"
                  disable={state === "pending"}
                  p={2}
                  onClick={() => setKrmelecItemFormData({})}
              >
                <Icon path={mdiCashPlus} size={0.8} /> Přidat krmelec
              </Button>
            </div>
          </Stack>
        </Card.Header>
        <Card.Body className="px-0" style={{ position: "relative", top: "40px" }}>
          {state === "pending" && !data
              ? [0, 1, 2, 3].map((item) => <PendingItem key={item} />)
              : null}
          {data ? (
              <div>
                <Card className="border-0">
                  <Card.Body>
                    <Card.Title>
                      <Stack direction="horizontal" gap={1}>
                        Aktivní krmeliště
                        <div
                            className="ms-auto"
                            style={{ display: "flex", alignItems: "center" }}
                        ></div>
                      </Stack>
                    </Card.Title>
                    <Card.Text>
                        <Accordion
                            activeKey={activeKey}
                            onSelect={(selectedKey) =>
                                setActiveKey((prev) => (prev === selectedKey ? null : selectedKey))
                            }
                            alwaysOpen={false}
                        >
                            {dashboardData.krmelecEntries.map((entry, idx) => {
                                const eventKey = String(idx);   // Always use string for eventKey

                                return (
                                    <KrmelecDetails
                                        key={eventKey}                    // important for React
                                        eventKey={eventKey}               // ← must match
                                        categoryId={entry.categoryId}
                                        name={entry.name}
                                        itemList={entry.krmivoList}
                                        setTransactionItemFormData={setKrmelecItemFormData}
                                        setTransactionItemDeleteDialog={setTransactionItemDeleteDialog}
                                    />
                                );
                            })}
                        </Accordion>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
          ) : null}
        </Card.Body>
      </Card>
  );
}

export default DashboardContent;
