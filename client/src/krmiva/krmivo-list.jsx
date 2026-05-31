import { useContext } from "react";
import { KrmivoContext } from "./krmivo-provider";
import Krmivo from "./krmivo";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Icon from "@mdi/react";
import { mdiRefresh } from "@mdi/js";

function KrmivoList() {
  const { data, state, handlerMap } = useContext(KrmivoContext);


  return (
    <div>
      <h1>
        <Stack direction="horizontal" gap={3}>
          <div>Dostupná krmiva</div>
          <div className="ms-auto">
            <Button
              variant="outline-success"
              size="sm"
              onClick={() => {
                handlerMap.fetchKrmivas();
              }}
            >
              <Icon path={mdiRefresh} size={1} spin={state === "loading"} />{" "}
              Aktualizovat
            </Button>
          </div>
        </Stack>
      </h1>
      <div>
        <Krmivo />
      </div>
      {data.itemList.length > 0 ? (
        data.itemList.map((category) => (
          <Krmivo key={category.id} data={category} />
        ))
      ) : (
        <div>Není vyplněna žádná kategorie</div>
      )}
    </div>
  );
}

export default KrmivoList;
