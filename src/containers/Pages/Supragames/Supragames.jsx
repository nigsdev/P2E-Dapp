import React from "react";
import { connect } from "react-redux";
import Unity, { UnityContext } from "react-unity-webgl";
import { withRouter, useParams } from "react-router-dom";
import { Container } from "reactstrap";
import { Beforeunload } from "react-beforeunload";

import {
  WalletProps,
  CasinoProps,
} from "../../../shared/prop-types/ReducerProps";
import { updateActiveGame } from "../../../redux/actions/casinoActions";
import "./Supragames.css";
import gamesList from "./gamesList";


const Supragames = ({ casino, dispatch }) => {
  const { supraGame } = useParams();
  const { loaderUrl, dataUrl, frameworkUrl, codeUrl } = gamesList.filter(
    (item) => item.type === supraGame
  )[0];

  const unityContext = new UnityContext({
    loaderUrl: loaderUrl,
    dataUrl: dataUrl,
    frameworkUrl: frameworkUrl,
    codeUrl: codeUrl,
  });

  unityContext.on("canvas", (canvas) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });

  unityContext.on("OrbGuiLoaded", () => {
    try {
      unityContext.send("OrbHolder", "OrbLogin", casino.activeGame.userName);
      unityContext.send(
        "Player",
        "SetCoinsCount",
        casino.activeGame.currentBalance
      );
    } catch (err) {
      console.error();
    }
  });


  unityContext.on("RouletteOrbLoaded", () => {
    console.log("RouletteOrbLoaded", casino.activeGame.currentBalance);
    try {
      unityContext.send("OrbHolder", "OrbLogin", String(casino.activeGame.currentBalance));
    } catch (err) {
      console.error();
    }
  });

  // unityContext.on("BaccaratOrbLoaded", () => {
  //   try {
  //     console.log("BaccaratOrbLoaded");
  //     unityContext.send("BBMainMenuController", "setPlayerNickname", games.activeGame.userName);
  //     unityContext.send("BBMainMenuController", "setPlayerBalance", games.activeGame.currentBalance);
  //   } catch (err) {
  //     console.error();
  //   }
  // })

  unityContext.on("CrapsOrbLoaded", () => {
    try {
      console.log("CrapsOrbLoaded");
      unityContext.send("OrbHolder", "OrbLogin", String(casino.activeGame.currentBalance));
    } catch (err) {
      console.error();
    }
  })


  unityContext.on("CoinsUpdated", (coins) => {
    console.log("coin updated ", coins);
    try {
      const payload = {
        gameName: casino.activeGame.gameName,
        currentBalance: String(coins),
        startBalance: casino.activeGame.startBalance,
        useraddress: casino.activeGame.useraddress,
        userName: casino.activeGame.userName,
        gemName: casino.activeGame.gemName,
        isActive: true,
      };
      dispatch(updateActiveGame(payload));
    } catch (err) {
      console.error();
    }
  });

  function handleOnClickFullscreen() {
    unityContext.setFullscreen(true);
  }

  // function handleOnClickExitscreen() {
  //   unityContext.setFullscreen(false);
  // }


  return (
    <>
      <div>
        <Beforeunload
          onBeforeunload={(event) => {
            event.preventDefault();
          }}
        >

          <Container>

            <div>


              {/* Exit Button For UnityGame */}
              {/*  <button onClick={handleOnClickExitscreen}>Exit Screen</button>  */}


              <Unity
                className="boxShadowForGame"
                unityContext={unityContext}
                matchWebGLToCanvasSize={true}
                style={{
                  width: "100%",
                  height: "80%",
                  background: "grey",
                }}
              />
              <button className="bn3637 bn36" onClick={handleOnClickFullscreen}><span className="lnr lnr-move mr-2 font-weight-bold"></span>Full</button>
            </div>
          </Container>
        </Beforeunload>
      </div>
    </>
  );
};

Supragames.propTypes = {
  walletState: WalletProps.isRequired,
  casino: CasinoProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    walletState: state.walletState,
    casino: state.casino,
  }))(Supragames)
);
