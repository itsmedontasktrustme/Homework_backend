import { useContext } from "react";
import { KrmivoContext } from "./krmivo-provider";
import Loading from "../common/loading";
import Error from "../common/error";
import KrmivoList from "./krmivo-list";

const KrmivoStateResolver = () => {
  const { data, state, error } = useContext(KrmivoContext);

  if (data) {
    return <KrmivoList />;
  }

  if (state === "loading" && !data) {
    return (
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "90vh",
        }}
      >
        <div style={{ position: "absolute" }}>
          <Loading size={7} spin={4} />
        </div>
        <div style={{ position: "absolute" }}>
          <Loading size={6} spin={2} />
        </div>
        <div style={{ position: "absolute" }}>
          <Loading size={9} spin={6} />
        </div>
      </div>
    );
  }

  if (state === "error" && !data) {
    return <Error message={error} />;
  }
};

export default KrmivoStateResolver;
