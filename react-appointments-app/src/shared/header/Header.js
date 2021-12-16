import React from "react"
import { Container, Navbar, Nav, NavDropdown, Divider } from "react-bootstrap"

function Header(props) {
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/">{props.name}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/appointments">Appointments</Nav.Link>
              {/* <Nav.Link href="/add-vehicle">Add Vehicle</Nav.Link> */}
              {/* <NavDropdown title="Vehicles" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">List</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Add Vehicle</NavDropdown.Item>
              </NavDropdown> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default Header;