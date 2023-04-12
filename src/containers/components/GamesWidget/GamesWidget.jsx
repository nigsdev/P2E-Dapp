import React, { useState } from "react";
import PropTypes from "prop-types";
import { reduxForm } from "redux-form";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Col, CardBody, Card, CardImg, CardTitle } from "reactstrap";
import { Redirect } from "react-router-dom";
import classes from "./GamesWidget.module.css";
import {
  WalletProps,
  GameProps,
  userGemProps,
} from "../../../shared/prop-types/ReducerProps";
import {
  createNewGame,
  endCurrentGame,
} from "../../../redux/actions/casinoActions";
import TextField from "@material-ui/core/TextField";
import GamesActivity from "./GamesActivity/GamesActivity";
import Sphynyx from "./GamesActivity/icons/sphynyx.png";
import { ContractHelpers } from "../../../blockchain/contract-helpers";
import Wallet from "../../App/wallets";

const renderTextField = ({
  input,
  label,
  meta: { touched, error },
  children,
  select,
  type,
  multiline,
}) => (
  <TextField
    className="material-form__field"
    label={label}
    type={type}
    error={touched && error}
    value={input.value}
    children={children}
    select={select}
    multiline={multiline}
    onChange={(e) => {
      e.preventDefault();
      input.onChange(e.target.value);
    }}
  />
);

renderTextField.propTypes = {
  input: PropTypes.shape().isRequired,
  label: PropTypes.string.isRequired,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  select: PropTypes.bool,
  children: PropTypes.arrayOf(PropTypes.element),
  type: PropTypes.string,
  multiline: PropTypes.bool,
};

renderTextField.defaultProps = {
  meta: null,
  select: false,
  children: [],
  type: "text",
  multiline: false,
};

const GamesWidget = ({
  walletState,
  dispatch,
  notifyUser,
  className,
  altTag,
  games,
  gameName,
  gemTokenId,
  setLoadingProgress,
}) => {
  const currentGem = walletState.gemsAttributes.filter(
    (e) => e.tokenId === gemTokenId
  )[0];

  const [isStartPlaying, setIsStartPlaying] = useState(false);

  const startGame = async () => {
    // fetch gem data from wallet state using token id
    if (currentGem.isApprovedForRelease && currentGem.isApprovedForTimelock) {
      await ContractHelpers.enterSlotMachineOrb({
        tokenId: gemTokenId,
        from: walletState.connectedAddress,
      }).then(() => {
        const payload = {
          gameName: gameName,
          currentBalance: parseInt(currentGem.chipsBalance),
          startBalance: parseInt(currentGem.chipsBalance),
          useraddress: walletState.connectedAddress,
          userName: walletState.connectedName,
          gemName: currentGem.name,
          isActive: true,
        };
        dispatch(createNewGame(payload));
        setIsStartPlaying(true);
      }).catch((error) => {
        console.log(error);
      })
      
    } else {
      ContractHelpers.setApprovalForAll(
        gemTokenId,
        walletState.connectedAddress,
        setLoadingProgress
      );
    }
  };

  const continueGame = () => {
    setIsStartPlaying(true);
  };

  const endGame = async () => {
    const receipt = await ContractHelpers.exitSlotMachineOrb({
      tokenId: gemTokenId,
      from: walletState.connectedAddress,
      currentBalance: games.activeGame.currentBalance,
    });
    console.log(receipt);

    dispatch(endCurrentGame());
    const meta = Wallet.instance();
    await meta.prepare();
    await meta.update(walletState.connectedAddress);
    // meta.update(walletState.connectedAddress);
    // const wallet = Wallet.instance()
  };

  if (isStartPlaying) {
    return <Redirect to={"/game/" + gameName} />;
  }

  return (
    <>
      <Col md={12} lg={12} xl={12}>
        <Card>
          <GamesActivity gameName={gameName} walletState={walletState} gemTokenId={gemTokenId}/>
          <CardImg
            top
            width="100%"
            className={className}
            src={Sphynyx}
            alt={altTag}
          />
          <CardBody>
            <CardTitle tag="h5" className="font-weight-bold">
              {gameName}
            </CardTitle>

            {gameName !== "bacarrat" ? (
              games.activeGame.isActive ? (
                <>
                  <br></br>
                  <br></br>
                  <button
                    className={classes.glowonhover}
                    onClick={continueGame}
                  >
                    Continue Game
                  </button>

                  <button
                    className={`${classes.marginLeft} ${classes.glowonhover}`}
                    onClick={endGame}
                  >
                    End Game
                  </button>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <button className={classes.glowonhover} onClick={startGame}>
                      Start Playing
                    </button>
                  </div>
                </>
              )
            ) : (
              <div className="text-center">
                <br></br>
                <br></br>
                <button className={classes.glowonhover}>Available Soon</button>
              </div>
            )}
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

GamesWidget.propTypes = {
  walletState: WalletProps.isRequired,
  games: GameProps.isRequired,
  userGem: userGemProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    walletState: state.walletState,
    games: state.games,
    userGem: state.userGem,
  }))(
    reduxForm({
      form: "floating_labels_form",
    })(GamesWidget)
  )
);
