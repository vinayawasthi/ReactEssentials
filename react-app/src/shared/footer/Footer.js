import React from "react"
import {Container,Row, Col} from "react-bootstrap"
function Footer(props) {
    return (
      <Container>
        <Row>
          <Col>
          <hr />
          <p className="text-center">copyrights @{props.year}</p>
          </Col>
        </Row>
      </Container>
    )
  }

export default Footer;