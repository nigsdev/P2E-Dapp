import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import './Topbar.css'
import styles from './ButtonTwo.module.css'
import { Helpers } from '../../utils/helpers'
import classes from './Modal.module.css'
import stylesTWO from './ButtonThird.module.css'
const Topbar = ({ data, logout }) => {
  const [modal, setModal] = useState(false)

  const _reditectToETherscan = () => {
    const url = Helpers.formatEtherscanLink(data.chainId, data.address)
    return window.open(url, '_blank')
  }

  const toggle = () => setModal(!modal)

  const textAreaRef = useRef(null)

  function copyToClipboard(e) {
    textAreaRef.current.select()
    document.execCommand('copy')
    e.target.focus()
  }

  //BarCode URL
  const barCodeUrl = `https://chart.googleapis.com/chart?chs=225x225&chld=L|2&cht=qr&chl=ethereum:${data.address}`

  return (
    <div className="topbar">
      {/* Modal Start */}
      <Modal className={classes.modal} isOpen={modal} toggle={toggle}>
        <div className={classes.modalheader}>
          <ModalHeader className={classes.modalheaderTwo}>
            <p className={classes.modalheaderParagraph}>{data.shortAddress}</p>
          </ModalHeader>
          <ModalHeader className={classes.modalheaderThree}>
            <Link className={`btn ${classes.btncustom}`} to="/activity">
              <p className={classes.modalheaderThreeParagraph}>
                Go To Activity
              </p>
            </Link>
          </ModalHeader>
        </div>

        <ModalBody className={classes.modalbody}>
          <p className={classes.connectedToMetaMask}>
            <span className="lnr lnr-cloud lnr-4"></span>Connected to{' '}
            {data.walletName}
          </p>
          <input
            className={classes.modalbodyinput}
            placeholder="Search"
            value={data.address}
            ref={textAreaRef}
          />
        </ModalBody>
        <ModalBody className={classes.modalbodyTwo}>
          <Button
            onClick={copyToClipboard}
            className={classes.modalbodyTwoButtonOne}
          >
            Copy Address
          </Button>

          <Button
            onClick={_reditectToETherscan}
            className={classes.modalbodyTwoButtonTwo}
          >
            View On Explorer
          </Button>
        </ModalBody>
        <ModalBody className={classes.modalbodythree}>
          <img
            className={classes.modalbodythreeimage}
            src={barCodeUrl}
            alt="btn"
          />
        </ModalBody>
        <ModalBody className={classes.modalbodythree}>
          <Button onClick={toggle} className={classes.modalbodyTwoButtonOne}>
            Close Modal
          </Button>
        </ModalBody>
      </Modal>
      {/* Modal End */}
      <div className="topbar__wrapper">
        <div className="topbar__left">
          <Link className="topbar__logo" to="/dashboard" />
          <Link className="dFlexTop" to="/dashboard">
            <h5 className="dFlexTop textOrange font-weight-bold">Dashboard</h5>
          </Link>
        </div>
        <div className="topbar__right topbar_right-2">
          <Button
            className={`btn ${styles.btnCustomDark} ${styles.btncustomMarginTwo} ${styles.bothButton} `}
            onClick={() => toggle()}
          >
            <span className="lnr lnr-sync"></span> {data.shortAddress}
          </Button>

          <Button
            className={`btn ${styles.btnCustom} ${styles.btncustomMarginTop} ${styles.bothButton}`}
            onClick={logout}
          >
            <span className="lnr lnr-cross-circle"></span> Disconnect
          </Button>
          <Button
            className={`btn ${stylesTWO.btnCustomThree}`}
            onClick={logout}
          >
            <span className="lnr lnr-chevron-left"></span> Back
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Topbar
