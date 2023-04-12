import React from "react";
import { Card, CardBody, Col, Progress } from "reactstrap";

const DefaultProgressBar = () => {

  return (
    <Col md={12} lg={6} className="m-0 p-0">
      <Card>
        <CardBody className="p-0">
          <div className="card__title"></div>
          <div className="progress-wrap">
            <Progress value={60} />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

export default DefaultProgressBar;
