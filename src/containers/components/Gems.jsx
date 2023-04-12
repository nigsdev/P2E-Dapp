import React from 'react';
import { Container, Col } from "reactstrap";
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import GemDetail from './GemDetail';
import { GemProps } from '../../shared/prop-types/ReducerProps';

const Gems = ({ gems }) => {
  return (
    <Container>
      <Col md={12} lg={12}>
        <GemDetail items={gems.data.slice(0,3)} />
        <GemDetail items={gems.data.slice(3,6)} />
      </Col>
    </Container>
  );
} 

Gems.propTypes = {
  gems: GemProps.isRequired,
}

export default withRouter(
  connect((state) => ({
    gems: state.gems,
  }))(Gems));
