import React, { useState } from "react";
import { Card, CardBody, Col, Button, Input, Container } from "reactstrap";
// import GamesWidget from "../../../components/GamesWidget/GamesWidget";
import Gallery from "../../../components/GemsWidget/Gallery";

import "../../../components/GemsWidget/Custom.css";
import styles from "../../../components/GemsWidget/ButtonSecond.module.css";

const ManageGem = ({ OnSubmit, userGemdata, setLoadingProgress }) => {
  const [formData, updateFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
    setErrorMessage("");
  };

  const IsValid = (amount, isRelease) => {
    if (isNaN(amount) || amount === "") {
      setErrorMessage("Please Enter Valid Amount.");
      return false;
    }
    if (parseInt(amount) < 21) {
      setErrorMessage("Amount Should be more than 20.");
      return false;
    }
    if (isRelease && parseInt(amount) > userGemdata.chipsBalance) {
      setErrorMessage(
        "Amount should not be more then available chips balance "
      );
      return false;
    }
    return true;
  };

  const _handleAdd = async (e) => {
    e.preventDefault();
    const amount = formData.chips;
    if (IsValid(amount, false)) {
      await OnSubmit({ action: "add", amount, tokenId: userGemdata.tokenId });
      updateFormData({ chips: "" });
    }
  };

  const _handleRelease = async (e) => {
    e.preventDefault();
    const amount = formData.chips;
    if (IsValid(amount, true)) {
      await OnSubmit({
        action: "release",
        amount,
        tokenId: userGemdata.tokenId,
      });
      updateFormData({ chips: "" });
    }
  };

  return (
    <>
      <div className="product-card__rate">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="product-card__link ml-0 custom-orange-color " href="#">
          #{userGemdata.tokenId}
        </a>
      </div>
      <div className="product-card__rate">
        <p className="typography-message">{userGemdata.metaData.description}</p>
      </div>
      <form className="custom-border-top">
        <h5 className="mt-3 font-weight-bold">
          Available Chips {userGemdata.chipsBalance}
        </h5>
        <Input
          type="text"
          name="chips"
          onChange={handleChange}
          className="margin_top-1 custom_textbox"
          placeholder="Chips Quantity"
          value={formData.chips}
        />
        <p className="typography-message">{errorMessage}</p>
        <Button
          onClick={_handleAdd}
          color="btn btn-secondary mt-3 bg_black text-white"
        >
          Add More Chips
        </Button>
        <Button
          className={styles.buttonSecond}
          onClick={_handleRelease}
          color="btn btn-secondary text-white"
        >
          Redeem Chips
        </Button>
      </form>
    </>
  );
};

const GemDetails = ({
  onSubmit,
  userGemData,
  notifyUser,
  setLoadingProgress,
}) => {
  const _handleSubmit = async ({ action, amount, tokenId }) => {
    try {
      console.log("handlesubmit");
      console.log("check", action, amount, tokenId);
      await onSubmit({ action, amount, tokenId });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Container>
        <Col md={12} lg={12}>
          <Card>
            <CardBody>
              <div className="product-card">
                <Gallery image={userGemData.metaData.image} />
                <div className="product-card__info">
                  <h3 className="product-card__title font-weight-bold">
                    {userGemData.name} Gem
                  </h3>
                  <ManageGem
                    OnSubmit={_handleSubmit}
                    userGemdata={userGemData}
                    setLoadingProgress={setLoadingProgress}
                  ></ManageGem>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
        {/* <Row>
          <Col md={4} lg={4} sm={12}>
            <GamesWidget
              notifyUser={notifyUser}
              gameName={"slotMachine"}
              gemTokenId={userGemData.tokenId}
              setLoadingProgress={setLoadingProgress}
            />
          </Col>
          <Col md={4} lg={4} sm={12}>
            <GamesWidget
              notifyUser={notifyUser}
              gameName={"roullette"}
              gemTokenId={userGemData.tokenId}
              setLoadingProgress={setLoadingProgress}
            />
          </Col>
          <Col md={4} lg={4} sm={12}>
            <GamesWidget
              notifyUser={notifyUser}
              gameName={"baccarat"}
              gemTokenId={userGemData.tokenId}
              setLoadingProgress={setLoadingProgress}
            />
          </Col>
        </Row>
        <Row>
          <Col md={4} lg={4} sm={12}>
            <GamesWidget
              notifyUser={notifyUser}
              gameName={"craps"}
              gemTokenId={userGemData.tokenId}
              setLoadingProgress={setLoadingProgress}
            />
          </Col>
        </Row> */}
      </Container>
    </>
  );
};

export default GemDetails;
