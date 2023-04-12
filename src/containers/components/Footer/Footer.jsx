import React from "react";
import PropTypes from "prop-types";
import { Card, CardBody, Col } from "reactstrap";
import styles from "./Footer.module.css";

const AlertComponent = () => {
    return (
      <Col className={styles.marginTop}>
        <Card className={styles.footerStyle}>
          <CardBody className={styles.bgblack}>
            <div className="text-white w-100">
              &copy; 2022 <strong className="text-danger"><a className="text-danger" target='_blank' href="https://www.supraorbs.com/" rel="noreferrer">Supraorbs</a></strong>.
              All Rights Reserved.
            </div>
          </CardBody>
        </Card>
      </Col>
    );
};

AlertComponent.propTypes = {
  divider: PropTypes.bool,
  color: PropTypes.string,
  title: PropTypes.string,
  subhead: PropTypes.string,
  label: PropTypes.string,
  icon: PropTypes.string,
  md: PropTypes.number,
  lg: PropTypes.number,
  xl: PropTypes.number,
  sm: PropTypes.number,
  xs: PropTypes.number,
  before: PropTypes.element,
  panelClass: PropTypes.string,
};

AlertComponent.defaultProps = {
  divider: false,
  color: "",
  title: "",
  subhead: "",
  label: "",
  icon: "",
  md: 0,
  lg: 0,
  xl: 0,
  sm: 0,
  xs: 0,
  before: null,
  panelClass: "",
};

export default AlertComponent;

export const PanelTitle = ({ title }) => (
  <div className="panel__title">
    <h5 className="bold-text">{title}</h5>
  </div>
);

PanelTitle.propTypes = {
  title: PropTypes.string.isRequired,
};
