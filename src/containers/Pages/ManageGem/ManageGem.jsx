import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import Unity from "react-unity-webgl";
import { connect } from "react-redux";
import { Beforeunload } from "react-beforeunload";
import {
  Container,
  Row,
  Col,
  CardBody,
  Card,
  ModalBody,
  ModalFooter,
  Spinner,
  Modal,
} from "reactstrap";
import Poster from "../ManageGem/img/cryptichuman.jpg";
import GemDetails from "../ManageGem/GemDetail/GemDetails";
import { ReactVideo } from "reactjs-media";
import Video from "../ManageGem/img/video.mp4";
import styles from "./ManageGem.module.css";
import {
  WalletProps,
  CasinoProps,
  ThemeProps,
  RTLProps,
} from "../../../shared/prop-types/ReducerProps";
import { GLOBALS } from "../../utils/globals";
import NotificationPopUp from "../../components/NotificationPopUp";
import { GemUtility } from "./Utility/gemUtility";
import { GameUtility } from "./Utility/gameUtility";
import GameContext from "./Utility/unityContext";

// MUI
import Tooltip from "@mui/material/Tooltip";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import StopOutlinedIcon from '@mui/icons-material/StopOutlined';
import { HiOutlineTrendingDown } from "react-icons/hi";

const ManageGem = ({ walletState, casino, theme, rtl }) => {
  const { gemType } = useParams();

  const gemInformation = GemUtility.getGemData(gemType);
  const [userGemInformation, setUserGemInformation] = useState(GemUtility.getUserGemData(walletState.gemsAttributes, gemInformation.name));

  useEffect(() => {
    if (!walletState.isFetching && walletState.gemsAttributes.length > 0) {
      setIsLoading(true);
      setLoadingProgress('Updating Gem Details')
      setUserGemInformation(GemUtility.getUserGemData(walletState.gemsAttributes, gemInformation.name));
      setIsLoading(false);
    }
    // Pending: Get Game details for user's token. Update casino reducer.
  }, [gemInformation.name, gemType, walletState]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async () => {
    if (!walletState.isFetching && walletState.gemsAttributes.length > 0) {
      setIsLoading(true);
      setLoadingProgress('Fetching Game Details: ' + String(userGemInformation.tokenId))
      const gameOrb = await GameUtility.getSlotMachineOrb(userGemInformation.tokenId)
      console.log('gameOrb', gameOrb, casino);
      setIsLoading(false);
    }
  }, [casino, gemInformation.name, gemType, userGemInformation.tokenId, walletState]);
  
  const [isShowNotification, setIsShowNotification] = useState(false);
  const [notificationDetails, setNotificationDetails] = useState({
    title: "",
    message: "",
    color: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState("");
  const [isPlaying, setIsPlaying] = useState(false); // Will be mapped reducer state

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

  const gameContext = GameContext.instance('slotMachine');
  const unityContext = gameContext.getUnityContext();

  function handleOnClickFullscreen() {
    gameContext.setFullscreen(true);
  }

  const handleSubmit = async ({ action, amount, tokenId }) => {
    switch (action) {
      case "add": {
        return await GemUtility.handleAddChips({ 
          tokenId, 
          amount, 
          setIsLoading, 
          setLoadingProgress, 
          connectedAddress: walletState.connectedAddress,
          notifyUser 
        });
      }
      case "release": {
        return await GemUtility.handleReleaseChips({ 
          tokenId, 
          amount, 
          setIsLoading, 
          setLoadingProgress, 
          connectedAddress: walletState.connectedAddress,
          notifyUser 
        });
      }
      case "play": {
        console.log('Play', action);
        gameContext.prepare('player supra', '1000')
        // Pending: Create transaction to start the game and update reducer based on the response received.
        setIsPlaying(true); // Test : data will be maped with reducer
        break;
      }
      case "stop": {
        console.log('Stop', action);
        // Pending: Create transaction to stop the game and update reducer based on the response received.
        setIsPlaying(false); // Test : data will be maped with reducer
        break;
      }
      default:
        return false;
    }
  };

  return (
    <>
      <Modal isOpen={isLoading} toggle={toggle}>
        <Spinner style={{ width: "3rem", height: "3rem", margin: "0 auto" }} />
        <ModalBody>
          <p>{loadingProgress}</p>
        </ModalBody>
        <ModalFooter></ModalFooter>
      </Modal>
      <Row className="mb-3 justify-content-center">
        <Col md={6} sm={6}>
          <Container>
            <h2 className="text-center mt-3 mb-2">
              Welcome To
              <strong className="custom-text-color">&nbsp;Supraorbs Casino</strong>
            </h2>
            <h4 className="text-white mt-1 mb-3 text-center">
              Your GEM is Ready!
            </h4>
            <h4 className="text-white mt-1 mb-3 text-center">
              Enjoy never-ending fun.
            </h4>
          </Container>
        </Col>
      </Row>
      <Row>
        <Container className="d-flex justify-content-center">
          <Col md={8} sm={12}>
            <Card>
              <CardBody className="p-0">
                {/* maintain state for is playing if true than load game
                 else display react video component, */}
                 { isPlaying ? <div>
                        <Beforeunload
                          onBeforeunload={(event) => {
                            event.preventDefault();
                          }}
                        >
                          <Container>
                            <div>
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
                            </div>
                          </Container>
                        </Beforeunload>
                      </div> : 
                      <ReactVideo
                        src={Video}
                        poster={Poster}
                        primaryColor="red"
                        className={styles.customVideo}
                      />
                  }
                <Col className="d-flex justify-content-between bg-black pt-2 pb-2">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mr-3 font-weight-bold">Balance</h5>
                    <HiOutlineTrendingDown className={styles.upDownIcon} />

                    {/* Balance Up Icon
                      <HiTrendingUp className={styles.upDownIcon}  />
                     */}
                  </div>
                  <div>
                    <Tooltip title="Play">
                      <PlayArrowOutlinedIcon
                        fontSize="large"
                        className={styles.playIcon}
                        onClick={() => { handleSubmit({ action: 'play' })}}
                      />
                      {/* Pending: Play or Pause button based on casino reducer */}
                    </Tooltip>
                    <Tooltip title="Stop">
                      <StopOutlinedIcon
                        fontSize="large"
                        className={styles.stopIcon}
                        onClick={() => { handleSubmit({ action: 'stop' })}}
                      />
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip title="Share">
                      <ShareOutlinedIcon
                        fontSize="large"
                        className={styles.shareIcon}
                      />
                    </Tooltip>
                    <Tooltip title="Full Screen">
                      <FullscreenOutlinedIcon
                        fontSize="large"
                        className={styles.fullScreenIcon}
                        onClick={handleOnClickFullscreen}
                      />
                    </Tooltip>
                  </div>
                </Col>
              </CardBody>
            </Card>
          </Col>
        </Container>
      </Row>

      <Row>
        <Container>
          <Row>
            <h3 className={styles.customTitle}>Manage Your Gems</h3>
            <GemDetails
              notifyUser={notifyUser}
              onSubmit={handleSubmit}
              userGemData={userGemInformation}
              setLoadingProgress={setLoadingProgress}
            />
          </Row>
        </Container>
      </Row>
    </>
  );
};

ManageGem.propTypes = {
  walletState: WalletProps.isRequired,
  casino: CasinoProps.isRequired,
  theme: ThemeProps.isRequired,
  rtl: RTLProps.isRequired,
};

export default withRouter(
  connect((state) => ({
    walletState: state.walletState,
    casino: state.casino,
    theme: state.theme,
    rtl: state.rtl,
  }))(ManageGem)
);
