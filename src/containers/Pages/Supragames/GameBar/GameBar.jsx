import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Row, Col } from "reactstrap";
import Profit from "../GameBar/img/profit.png";
import Loss from "../GameBar/img/loss.png";
import styles from "./GameBar.module.css";
import { GameProps } from "../../../../shared/prop-types/ReducerProps";

const GameBar = ({ games }) => {
  return (
    <div className={styles.bg}>
      <Row>
        <Col sm={3} xl={2}>
          <Row>
            <Col xs="6" sm="4" xl={6}>
              <p className="font-weight-bold">Start Balance</p>
            </Col>
            <Col xs="6" sm="4" xl={6}>
              <p className="text-left">{games.activeGame.startBalance}</p>
            </Col>
          </Row>
        </Col>
        <Col sm={3} xl={2}>
          <Row>
            <Col xs="6" sm="4" xl={6}>
              <p className="font-weight-bold">Current Balance</p>
            </Col>
            <Col xs="6" sm="4" xl={6}>
              <p className="text-left">
                {games.activeGame.currentBalance} Chips
              </p>
            </Col>
          </Row>
        </Col>

        <Col sm={3} xl={2}>
          <Row>
            <Col xs="6" sm="4" xl={6}>
              {(games.activeGame.currentBalance)
                ?
                parseInt(games.activeGame.currentBalance) < parseInt(games.activeGame.startBalance)
                  ?
                  String(parseInt(games.activeGame.startBalance) - parseInt(games.activeGame.currentBalance)) + ' Chips Loss'
                  :
                  String(parseInt(games.activeGame.currentBalance) - parseInt(games.activeGame.startBalance)) + ' Chips Won'
                :
                '0 Chips Won'

              }

              {(games.activeGame.currentBalance)
                ?
                parseInt(games.activeGame.currentBalance) < parseInt(games.activeGame.startBalance)
                  ?
                  <img className={styles.imageCss} src={Loss} />
                  :
                  <img className={styles.imageCss} src={Profit} />
                :
                <img className={styles.imageCss} src={Profit} />

              }
              {/* <p className="text-left">
                {parseInt(games.activeGame.currentBalance) >
                  parseInt(games.activeGame.startBalance)
                  ? parseInt(games.activeGame.currentBalance) -
                  parseInt(games.activeGame.startBalance)
                  : "0"}
              </p>
            </Col>
            <img className={styles.imageCss} src={Profit} /> */}
            </Col>
          </Row>
        </Col>
        {/* <Col sm={3} xl={2}>
          <Row>
            <Col xs="6" sm="4" xl={6}>
              <p className="text-left">
                {parseInt(games.activeGame.currentBalance) <
                  parseInt(games.activeGame.startBalance)
                  ? parseInt(games.activeGame.startBalance) -
                  parseInt(games.activeGame.currentBalance)
                  : "0"}
              </p>
            </Col>

            <img className={styles.imageCss} src={Loss} />
          </Row>
        </Col> */}
        <Col sm={3} xl={2}>
          <p className="font-weight-bold">{games.activeGame.gemName}</p>
        </Col>
      </Row>
    </div>
  );
};

GameBar.propTypes = {
  games: GameProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    games: state.games,
  }))(GameBar)
);
