import React from "react";
import { Container, Row, Card, Col, CardBody } from "reactstrap";
import DigitalMamoth from "./imgs/pic64.jpg";
import GeishaChronology from "./imgs/pic63.jpg";
import PushinasKeep from "./imgs/pic65.jpg";
import "./Custom.css";
const MintRelic = () => (
  <Container>
    <h2 className="ml-3  margin-top-7 text-center">
      High Yield <strong className="custom-text-color">Relics</strong>
    </h2>
    <h4 className="text-center mt-2">Put your Gems in Relics and Earn upto 100% APY.</h4>
    <h5 className="text-center mb-2 mt-2">Coming Soon</h5>
    <hr style={{ backgroundColor: "red", width: "20%" }} />
    <Row>
      <Col md={4} lg={4} xl={4}>
        <Card>
          <CardBody>
            <img
              className="shadow hoverOnRelic"
              src={DigitalMamoth}
              alt="relic"
            />
          </CardBody>
        </Card>
      </Col>
      <Col md={4} lg={4} xl={4}>
        <Card>
          <CardBody>
            <img
              className="shadow hoverOnRelic"
              src={GeishaChronology}
              alt="relic"
            />
          </CardBody>
        </Card>
      </Col>
      <Col md={4} lg={4} xl={4}>
        <Card>
          <CardBody className="image-container">
            <img
              className="shadow hoverOnRelic"
              src={PushinasKeep}
              alt="relic"
            />
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);
export default MintRelic;
