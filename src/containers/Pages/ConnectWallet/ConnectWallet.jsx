import React, { useState } from "react";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Row, Col, Spinner, Modal, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import "./ConnectWallet.css";
// Frameworks
import * as _ from "lodash";

import Wallet from "../../App/wallets";
import { WalletProviders } from "../../App/wallets/providers.js";
import { GLOBALS } from "../../utils/globals";
import NotificationPopUp from "../../components/NotificationPopUp";
import { ThemeProps, RTLProps } from "../../../shared/prop-types/ReducerProps";

function WalletWrapper({
  walletKey,
  setIsRedirect,
  notifyUser,
  setLoadingProgress,
  setIsLoading,
}) {
  //walletKey Validation
  if (_.isUndefined(WalletProviders[walletKey])) {
    return "";
  }

  const wallet = Wallet.instance();
  const { name, logo } = WalletProviders[walletKey];
  const _walletConnect = async () => {
    setLoadingProgress("Please Wait! Connecting...");
    setIsLoading(true);
    try {
      await wallet.prepare(walletKey);
      await wallet.connect().then((result) => {
        setIsLoading(false);
        if (result) setIsRedirect(true);
      });
    } catch (err) {
      setIsLoading(false);
      const type = "transactionError";
      notifyUser("danger", type, "");
      console.error(err);
    }
  };

  return (
    <div role="button" onClick={_walletConnect}>
      <img
        className="pricing-card__img centerImage"
        style={{
          maxWidth: "30%",
          height: "auto",
          marginTop: "2rem",
          marginLeft: "2.3rem",
        }}
        src={logo}
        alt="logo"
      />
      <h5
        className="pricing-card__plan "
        style={{ marginTop: "-6%", marginLeft: "0rem", textAlign: "center" }}
      >
        {name}
      </h5>
    </div>
  );
}

WalletWrapper.propTypes = {
  walletKey: PropTypes.string.isRequired,
};

const ConnectWallet = ({ theme, rtl }) => {
  const [isRedirect, setIsRedirect] = useState(false);
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    message: "",
    color: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("");

  if (isShowNotification) {
    NotificationPopUp(
      theme,
      rtl,
      setIsShowNotification,
      notificationDetails.title,
      notificationDetails.message,
      notificationDetails.color
    );
  }

  const toggle = () => setIsLoading(!isLoading);

  const notifyUser = (status, type, message) => {
    const color = status;
    const data = GLOBALS.NOTIFICATION_DETAILS.filter(
      (item) => item.id === type
    )[0];
    const title = data.title;
    if (message === "") message = data.message;
    setNotificationDetails({ title, message, color });
    setIsShowNotification(true);
  };

  if (isRedirect) {
    return <Redirect to="dashboard" />;
  }

  return (
    <>
      {/* Modal Started */}
      <Modal isOpen={isLoading} toggle={toggle}>
        <Spinner style={{ width: "3rem", height: "3rem", margin: "0 auto" }} />
        <ModalBody>
          <h5>{loadingProgress}</h5>
        </ModalBody>
      </Modal>
      {/* Modal Ended */}
      <div className="account account--photo">
        <div className="account__wrapper">
          <div className="account__card">
            <div className="account__head">
              <h3 className="account__title">
                Welcome to
                <span className="account__logo text__orange"> Subraorbs</span>
              </h3>
              <h4 className="account__subhead subhead">Connect Your Wallet</h4>
            </div>

            <div className="account__or">
              <p className="text__orange">Login to Supraorbs</p>
            </div>
            <Row>
              <Col className="hoverOnImage" md={6} sm={3}>
                <WalletWrapper
                  walletKey={GLOBALS.WALLET_TYPE_METAMASK}
                  setIsRedirect={setIsRedirect}
                  notifyUser={notifyUser}
                  setLoadingProgress={setLoadingProgress}
                  setIsLoading={setIsLoading}
                />
              </Col>
              <Col className="hoverOnImage" md={6} sm={3}>
                <WalletWrapper
                  walletKey={GLOBALS.WALLET_TYPE_WALLETCONNECT}
                  setIsRedirect={setIsRedirect}
                  notifyUser={notifyUser}
                  setLoadingProgress={setLoadingProgress}
                  setIsLoading={setIsLoading}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </>
  );
};

ConnectWallet.propTypes = {
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    theme: state.theme,
    rtl: state.rtl,
  }))(ConnectWallet)
);
