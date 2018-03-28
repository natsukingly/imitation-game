import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './User.css';


const pendingUser = (props) => {

  let pendingUser = null;

  if (props.players[props.userId].ready !== true){
    pendingUser =  (
         <div className={classes.User} key={props.userId}>
          <div style={{backgroundImage: 'url(' + props.players[props.userId].image + ')'}} className={classes.UserImage} alt="user_image"> </div>
          <p>{props.players[props.userId].name}</p>
        </div>
      );
  }

  return (
    <Aux>
      {pendingUser}
    </Aux>
  );
};

export default pendingUser;
