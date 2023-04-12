import React, { useState } from 'react'
import { Nav, NavItem, NavLink, TabContent, TabPane, Button } from 'reactstrap'
import classes from './ButtonSecond.module.css'
import classnames from 'classnames'

const Tabs = ({ description, address }) => {
  const [activeTab, setActiveTabs] = useState('1')

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTabs(tab)
  }

  return (
    <div className="tabs mt-5">
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => toggle('1')}
          >
            Game Details
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => toggle('2')}
          >
            Relics
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab} className="typography-message">
        <TabPane tabId="1">
          <button className={classes.glowonhover}>Start Playing</button>

          <button className={classes.glowonhover}>End Game</button>
          <br></br>
          <br></br>
       
        </TabPane>
        <TabPane tabId="2">
          <button className={classes.glowonhover} disabled>
            Start Playing
          </button>
          <br></br>
          <br></br>
        </TabPane>
        <TabPane tabId="3"></TabPane>
      </TabContent>
    </div>
  )
}

export default Tabs
