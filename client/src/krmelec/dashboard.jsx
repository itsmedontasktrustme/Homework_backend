import Container from "react-bootstrap/esm/Container";
import KrmelecListProvider from "./krmelec-list-provider";
import DashboardContent from "./dashboard-content";

function Dashboard() {
  return (
    <Container>
      <KrmelecListProvider>
        <DashboardContent />
      </KrmelecListProvider>
    </Container>
  );
}

export default Dashboard;
