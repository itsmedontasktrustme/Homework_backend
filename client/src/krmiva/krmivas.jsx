import KrmivoProvider from "./krmivo-provider";
import KrmivoStateResolver from "./krmivo-state-resolver";
import Container from "react-bootstrap/Container";

const Krmiva = () => {
  return (
    <KrmivoProvider>
      <Container>
        <KrmivoStateResolver />
      </Container>
    </KrmivoProvider>
  );
};

export default Krmiva;
