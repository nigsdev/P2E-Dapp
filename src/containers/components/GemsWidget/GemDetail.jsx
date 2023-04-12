import React, { useState } from "react";
import {
    Card,
    CardBody,
    Col,
    ButtonToolbar,
    Button,
    Input,
    Container,
} from "reactstrap";
import { Link } from "react-router-dom";
import Gallery from "./Gallery";
import Tabs from "./Tabs";
import "./Custom.css";
import { Helpers } from "../../utils/helpers";
import styles from "../GemsWidget/ButtonSecond.module.css";
const BuyGem = ({ _handleBuy, data }) => {
    return (
        <>
            <div className="product-card__rate">
                {data[0].isAvailable ? (
                    <a className="product-card__link ml-0 custom-orange-color " href="#">
                        #{data[0].tokenIds[0].tokenId}
                    </a>
                ) : (
                    <a className="product-card__link ml-0 custom-orange-color " href="#">
                        Not Available
                    </a>
                )}
            </div>
            <h3 className="product-card__price mb-0"> {data[0].salePrice} ETH </h3>
            <h4 className="custom-orange-color ">
                {" "}
                $ {parseInt(data[0].ethUsdPrice)}{" "}
            </h4>
            <p className="typography-message">{data[0].about}</p>
            <br />
            <h4 className="custom-orange-color ">Get {data[0].gameAssetDesc}</h4>
            <br />
            {data[0].isAvailable ? (
                <h4 className="catalog-item__title">
                    {" "}
                    {data[0].tokenIds.length} Available{" "}
                </h4>
            ) : (
                ""
            )}
            <form className="form product-card__form">
                {data[0].isAvailable ? (
                    <ButtonToolbar className="product-card__btn-toolbar">
                        <Link
                            className="btn btn-custom-three"
                            onClick={_handleBuy}
                            to="/e-commerce/cart"
                        >
                            <span className="lnr lnr-store"></span> Buy Now
                        </Link>
                    </ButtonToolbar>
                ) : (
                    <h4 className="catalog-item__title">Coming Soon!</h4>
                )}
            </form>
        </>
    );
};

const ManageGem = ({ OnSubmit, userGemdata }) => {
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
        if (
            isRelease &&
            parseInt(amount) > userGemdata[0].assetBalance[0].principal
        ) {
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
            await OnSubmit({ action: 'add', amount, tokenId: userGemdata[0].gemTokenId });
            updateFormData({ chips: "" });
        }

    };

    const _handleRelease = async (e) => {
        e.preventDefault();
        const amount = formData.chips;
        if (IsValid(amount, true)) {
            await OnSubmit({ action: 'release', amount, tokenId: userGemdata[0].gemTokenId });
            updateFormData({ chips: "" });
        }

    };

    return (
        <>
            <div className="product-card__rate">
                <a className="product-card__link ml-0 custom-orange-color " href="#">
                    #{userGemdata[0].gemTokenId}
                </a>
            </div>
            <form className="custom-border-top">
                <h5 className="mt-3 font-weight-bold">
                    Chips{" "}
                    {userGemdata[0].assetBalance
                        ? Helpers.toEther(userGemdata[0].assetBalance[0].principal)
                        : 0}
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

const GemDetail = ({ onSubmit, data, userGemData }) => {

    const _handleBuy = async (e) => {
        e.preventDefault();
        const tokenId = parseInt(data[0].tokenIds[0].tokenId);
        const action = "buy";
        const amount = 0;
        try {
            await onSubmit({ action, amount, tokenId });
        } catch (err) {
            console.error(err);
        }
    };

    const _handleSubmit = async ({ action, amount, tokenId }) => {
        try {
            await onSubmit({ action, amount, tokenId });
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Container>
            <Col md={12} lg={12}>
                <Card>
                    <CardBody>
                        <div className="product-card">
                            <Gallery image={data[0].imageUrl} />
                            <div className="product-card__info">
                                <h3 className="product-card__title font-weight-bold">
                                    {data[0].name} Gem
                                </h3>
                                {userGemData[0].gemTokenId === "" ? (
                                    <BuyGem _handleBuy={_handleBuy} data={data}></BuyGem>
                                ) : (
                                    <ManageGem
                                        OnSubmit={_handleSubmit}
                                        userGemdata={userGemData}
                                    ></ManageGem>
                                )}

                             
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Container>
    );
};

export default GemDetail;