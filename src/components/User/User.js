import React from 'react';

import classes from './User.css';

const user = (props) => {
  let ready = null;

  if (props.players[props.userId].ready === true){
    ready = <p>im ready yo!!</p>;
  }
  return (
    <div className={classes.User} key={props.userId}>
      <div style={{backgroundImage: 'url(' + props.players[props.userId].image + ')'}} className={classes.UserImage} alt="user_image"> </div>
      <p>{props.players[props.userId].name}</p>
      {ready}
    </div>
  );
};

export default user;
