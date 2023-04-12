import React, { useState } from "react";
import { withRouter } from "react-router";
import {
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { connect } from "react-redux";

import Footer from "../../components/Footer/Footer";
import RelicSection from "../MintRelic/MintRelic";
import "./Dashboard.css";

import {
  ThemeProps,
  RTLProps,
  WalletProps,
} from "../../../shared/prop-types/ReducerProps";
import NotificationPopUp from "../../components/NotificationPopUp";
import { GLOBALS } from "../../utils/globals";
import Gem from "./Gem/Gem";
import { Helpers } from "../../utils/helpers";
import { ContractHelpers } from "../../../blockchain/contract-helpers.js";

const DashBoard = ({ theme, rtl, walletState, dispatch }) => {
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [isWelcome, setIsWelcome] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    message: "",
    color: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("");
  const gemMap = [1, 2, 3, 4, 5 ,6];

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

  // useEffect(async () => {
  //   console.log("walletState.gemsAttributes",walletState.gemsAttributes)
  //   console.log("walletState",walletState)
  //   try {
  //     dispatch(fetchUserGemsRequest())
  //     const payload = await Helpers.userAllGemsDetails(
  //       walletState.connectedAddress,
  //     )
  //     console.log('test2', payload)
  //     dispatch(fetchUserGemsSuccess(payload))
  //   } catch (err) {
  //     dispatch(fetchUserGemsError(err))
  //   }
  // }, [dispatch])

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

  if (walletState.isAllReady && !isWelcome) {
    const type = "welcome";
    notifyUser("success", type, "");
    setIsWelcome(true);
  }

  const refreshUserData = async () => {
    await Helpers.updateWallet(walletState.connectedAddress);
    return true;
  };

  const sendErrorNotification = () => {
    const type = "transactionError";
    notifyUser("danger", type, "");
  };

  const handleUsdtApproving = async () => {
    setIsLoading(true);
    setLoadingProgress("Allow Your Gem to Spend USDT");
    const options = {
      from: walletState.connectedAddress,
      setLoadingProgress,
    };
    try {
      const response = await ContractHelpers.allowUsdtSpending(options);
      setLoadingProgress("Getting Transaction Details!");
      const { txReceipt } = response;
      if (txReceipt.status) {
        const type = "USDTApprove";
        notifyUser("success", type, "");
      } else if (!txReceipt.status) {
        sendErrorNotification();
      }

      return await refreshUserData();
    } catch (err) {
      sendErrorNotification();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const buyGem = async (gemData) => {
    setIsLoading(true);
    setLoadingProgress("Minting Gem");

    const options = {
      from: walletState.connectedAddress,
      gemData: gemData,
      setLoadingProgress,
    };

    try {
      //Checking if user has approved USDT transfer for the contract
      if (!walletState.isUSDTSpendingAllowed) {
        return await handleUsdtApproving();
      }

      const response = await ContractHelpers.buyGem(options);
      setLoadingProgress("Getting Transaction Details!");
      const { txReceipt } = response;
      if (txReceipt.status) {
        const type = "buyGem";
        notifyUser("success", type, "");
      } else if (!txReceipt.status) {
        sendErrorNotification();
      }

      return await refreshUserData();
    } catch (err) {
      console.error(err);
      sendErrorNotification();
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        {/* Modal Started */}
        <Modal isOpen={isLoading} toggle={toggle}>
          <Spinner
            style={{ width: "3rem", height: "3rem", margin: "0 auto" }}
          />
          <ModalBody>
            <p>{loadingProgress}</p>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </Modal>
        {/* Modal Ended */}

        <Row className="mb-3 justify-content-center">
          <Col md={6} sm={6}>
            <h2 className="text-center mt-3 mb-2">
              Welcome To
              <strong className="custom-text-color">&nbsp;Supraorbs</strong>
            </h2>
            <h4 className="text-white mt-1 mb-3 text-center">
              Unlock Casino Games With Gems, Get Supra Chips And Start Playing.
            </h4>
            <h5 className="text-center mb-2 mt-2">
              Mint your Supraorbs NFTs Now
            </h5>
            <hr style={{ backgroundColor: "red", width: "40%" }} />
          </Col>
        </Row>

        <Container>
          <Row className="text-center centerRow">
            {gemMap.map((id) => {
              return <Gem key={id} id={id} buyGem={buyGem} />
            })}
            {/* <Gem id={1} buyGem={buyGem} />
            <Gem id={2} buyGem={buyGem} />
            <Gem id={3} buyGem={buyGem} />
            <Gem id={4} buyGem={buyGem} />
            <Gem id={5} buyGem={buyGem} />
            <Gem id={6} buyGem={buyGem} /> */}
          </Row>
        </Container>
      </Container>
      <RelicSection />
      <Footer />
    </>
  );
};

DashBoard.propTypes = {
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
  walletState: WalletProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    theme: state.theme,
    rtl: state.rtl,
    walletState: state.walletState,
  }))(DashBoard)
);
