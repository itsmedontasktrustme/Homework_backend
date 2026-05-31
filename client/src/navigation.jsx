import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import foodIcon from "./utensils-svgrepo-com.svg";

function Navigation() {
  const navigate = useNavigate();

  return (
    <Navbar
      expand="md"
      bg="primary"
      data-bs-theme="dark"
      collapseOnSelect={true}
    >
      <Container>
        <Navbar.Brand onClick={() => navigate("")}>
          <img
            src={foodIcon}
            alt="Správce krmelišť"
            height={20}
            style={{ marginRight: 6 }}
          />
          Správce krmelišť
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" size="sm" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => navigate("")}
              active={window.location.pathname === "/"}
              eventKey="dashboard"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              onClick={() => navigate("krmiva")}
              active={window.location.pathname === "/krmiva"}
              eventKey="krmivas"
            >
              Krmiva
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
