import React from 'react';

const icon = `${process.env.PUBLIC_URL}/img/burger.svg`;

const TopbarSidebarButton = () => (
  <div>
    <button type="button" className="topbar__button topbar__button--desktop">
      <img src={icon} alt="" className="topbar__button-icon" />
    </button>
    <button type="button" className="topbar__button topbar__button--mobile">
      <img src={icon} alt="" className="topbar__button-icon" />
    </button>
  </div>
);

export default TopbarSidebarButton;
