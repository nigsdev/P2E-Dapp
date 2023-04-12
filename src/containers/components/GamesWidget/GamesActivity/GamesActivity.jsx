import React from "react";
import { Col, Card, CardBody, Row } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import store from "../../../App/store";
import styles from "./GamesActivity.module.css";
import ActiveIcon from "./icons/greenicon.png";
import Profit from "./icons/profit.png";
import Loss from "./icons/loss.png";
import { GameProps } from "../../../../shared/prop-types/ReducerProps";

const GamesActivity = ({ games, gameName, walletState, gemTokenId }) => {
  console.log(store.getState());
  const currentGem = walletState.gemsAttributes.filter(
    (e) => e.tokenId === gemTokenId
  )[0];
  console.log(currentGem.chipsBalance);
  return (
    <Col id="2">
      <Card>
        <CardBody>
          <Row>
            <Col className={styles.fontSizeOnIpad}>
              <p>
                {games.activeGame.currentBalance && gameName === "slotMachine"
                  ? games.activeGame.currentBalance
                  : currentGem.chipsBalance}{" "}
                Chips
              </p>
            </Col>
            <Col className={`text-white ${styles.fontSizeOnIpad}`}>
              {games.activeGame.currentBalance && gameName === "slotMachine"
                ? parseInt(games.activeGame.currentBalance) <
                  parseInt(games.activeGame.startBalance)
                  ? String(
                      parseInt(games.activeGame.startBalance) -
                        parseInt(games.activeGame.currentBalance)
                    ) + " Chips Loss"
                  : String(
                      parseInt(games.activeGame.currentBalance) -
                        parseInt(games.activeGame.startBalance)
                    ) + " Chips Won"
                : "0 Chips Won"}

              {games.activeGame.currentBalance && gameName === "slotMachine" ? (
                parseInt(games.activeGame.currentBalance) <
                parseInt(games.activeGame.startBalance) ? (
                  <img className={styles.imageCss} src={Loss} alt="img" />
                ) : (
                  <img className={styles.imageCss} src={Profit} alt="img" />
                )
              ) : (
                <img className={styles.imageCss} src={Profit} alt="img" />
              )}

              {/* Manage with State */}
              {/* 321 ORBT Loss
              <img className={styles.imageCss} src={Loss} /> */}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              {games.activeGame.currentBalance && gameName === "slotMachine" ? (
                <p className={styles.fontSizeOnIpad}>
                  {games.activeGame.gemName}
                </p>
              ) : (
                <p className={styles.fontSizeOnIpad}>Start Game</p>
              )}
            </Col>
            <Col>
              <img src={ActiveIcon} className={styles.imageCss} alt='iconImage'/>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

GamesActivity.propTypes = {
  games: GameProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    games: state.games,
  }))(GamesActivity)
);
