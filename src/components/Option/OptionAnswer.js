import React from 'react';

import Aux from '../../hoc/Aux/Aux';
import classes from './Option.css';

import Logo from '../Logo/Logo';

const optionAnswer = (props) => {


  let content = null;

  if(props.userName === "correct"){
    content = (
      <div
        className={classes.OptionAnswer}
        key={props.userId}
        data-option-id={props.userId}
        onClick={props.clicked}
      >
        <div className={classes.User}>
          <div className={classes.UserImageDummy} alt="user_image"> </div>
          <p>正解</p>
        </div>
        <div className={classes.ChatBox}>
          <p data-option-id={props.userId}>{props.content}</p>
        </div>
      </div>
    );
  } else if (props.userName === "dummy"){
    content = (
      <div
        className={classes.OptionAnswer}
        key={props.userId}
        data-option-id={props.userId}
        onClick={props.clicked}
      >
        <div className={classes.User}>
          <Logo logoSize="extraSmall" />
          <p>コンピューター</p>
        </div>
        <div className={classes.ChatBox}>
          <p data-option-id={props.userId}>{props.content}</p>
        </div>
      </div>
    );
  } else {
    content = (
      <div
        className={classes.OptionAnswer}
        key={props.userId}
        data-option-id={props.userId}
        onClick={props.clicked}
      >
        <div className={classes.User}>
          <div style={{backgroundImage: 'url(' + props.userImage + ')'}} className={classes.UserImage} alt="user_image"> </div>
            <p>{props.userName}</p>
        </div>
        <div className={classes.ChatBox}>
          <p data-option-id={props.userId}>{props.content}</p>
        </div>
      </div>
    );
  }

  return (
    <Aux>
      {content}
    </Aux>
  );
};

export default optionAnswer;
