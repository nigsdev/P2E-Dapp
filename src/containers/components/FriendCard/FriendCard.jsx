import React from "react";


const onClick = () => console.log('clicked');

const FriendCard = (props) => (
  <div role="button" onClick={onClick}  className="friend-card">
    <img className="avatar" src={props.image} />
    <h6>{props.walletname}</h6>
  </div>
);

export default FriendCard;
