import React from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import GemsTabs from './GemsTabs';

const GemsWidget = ({ notifyUser, setLoadingProgress, setIsLoading }) => {

  return (
    <Col md={12} lg={12} xs={12}>
      <Card>
        <CardBody>
          <div className="card__title">
            <h5 className="bold-text ml-3">Manage Gems</h5>
          
          </div>
          <div className="tabs tabs--justify">
            <GemsTabs
              notifyUser = {notifyUser}
              setLoadingProgress = {setLoadingProgress}
              setIsLoading = {setIsLoading}
            />
          </div>
        </CardBody>
      </Card>
    </Col>
  );
  
};

export default GemsWidget;
