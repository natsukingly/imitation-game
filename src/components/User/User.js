import React from 'react';

import classes from './User.css';
import noImage from '../../assets/images/no-image.png';

const user = (props) => {
  // let ready = null;
  //
  // if (props.players[props.userId].ready === true){
  //   ready = <p>im ready yo!!</p>;
  // }

  let photoURL = noImage;

  if(props.players[props.userId].image !== ''){
    photoURL = props.players[props.userId].image;
  }

  let active = null;

  if(props.players[props.userId].active === false){
    active = "[退場済み]"
  }

  return (
    <div className={classes.User} key={props.userId}>
      <div style={{backgroundImage: 'url(' + photoURL + ')'}} className={classes.UserImage} alt="user_image"> </div>
      <p>{props.players[props.userId].name}</p>
      <p className={classes.IsActive}>{active}</p>
    </div>
  );
};

export default user;
