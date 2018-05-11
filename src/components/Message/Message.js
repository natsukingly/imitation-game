import React from 'react';

import classes from './Message.css';
import noImage from '../../assets/images/no-image.png';

const message = (props) => {

  let attachedClass = classes.Msg;
  let ownerName = props.userName;

  if(props.self){
    attachedClass = classes.SelfMsg;
    ownerName = ownerName + ' (自分)'
  }

  let photoURL = noImage;
  if(props.userImage !== ''){
    photoURL = props.userImage;
  }

  return (
    <div className={classes.ChatBox}>
      <div className={attachedClass}>
        <div className={classes.MsgOwner}>
          {ownerName}
        </div>
        <div className={classes.MsgBody}>
          <div className={classes.MsgOwnerImage} style={{backgroundImage: 'url(' + photoURL + ')'}}></div>
          <div className={classes.MsgContent}>{props.msg}</div>
        </div>
      </div>
    </div>
  );
};

export default message;
