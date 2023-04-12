import React from "react";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Col, Button } from "reactstrap";
import styles from "../Gem/Gem.module.css";
import gemsDefaultData from "../../../../blockchain/gemsDefaultData";

import { WalletProps } from "../../../../shared/prop-types/ReducerProps";

// import BeatLoader from "react-spinners/BeatLoader";

const Gem = ({ id, buyGem, walletState }) => {
  // let [loading, setLoading] = useState(true);
  // let [color, setColor] = useState("red");

  const gemInformation = gemsDefaultData.filter((item) => item.id === id)[0];
  const userGemInformation = walletState.gemsAttributes.filter(
    (gem) => gem.name === gemInformation.name
  );
  const userGemData =
    userGemInformation.length > 0 ? userGemInformation[0] : null;
  const _buyGem = async () => {
    try {
      await buyGem(gemInformation);

      return true;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <>
      <Col md={2} lg={2} xs={4}>
        <div
          className={` ${styles.imageContainer} ${
            userGemData ? styles.imageContainerTwo : ""
          }`}
        >
          <img className={styles.customGemImage} src={gemInformation.imageUrl} alt="gem" />
          {/* <video className={styles.customGemImage} loop autoPlay>
            <source src={gemInformation.imageUrl} type="video/mp4" />
          </video> */}

          <div className={styles.overlayImage}>
            <p className={styles.gem}>
              {userGemData
                ? "Token ID: #" + userGemData.tokenId
                : gemInformation.salePrice + " USDT"}
            </p>
            <h5 className="mt-3 pl-3 pr-3">
              {userGemData
                ? "Start Playing " + gemInformation.gameUnlocks
                : "Unlocks " + gemInformation.gameUnlocks}
            </h5>
          </div>
        </div>

        {/* When gems are loading, loading spinner will come in action */}
        {/* 
        <div className="sweet-loading">
          <BeatLoader color={color} loading={loading} size={30} />
        </div> */}

        {/* Spinner Ended */}
        <h4 className={`font-weight-bold ${styles.marginTop}`}>
          {gemInformation.name}
        </h4>

        {userGemData ? (
          <Button className={styles.btnCustom}>
            <Link to={gemInformation.displayUrl}>Enter Casino</Link>
          </Button>
        ) : gemInformation.isAvailable ? (
          <Button className={styles.btnCustom} onClick={_buyGem}>
            Mint Now
          </Button>
        ) : (
          <Button className={styles.btnCustom}>Coming Soon</Button>
        )}
      </Col>
    </>
  );
};

Gem.propTypes = {
  walletState: WalletProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    walletState: state.walletState,
  }))(Gem)
);
