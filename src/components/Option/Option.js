import React from 'react';

import classes from './Option.css';

const option = (props) => {

  return (
    <div
      className={classes.Option}
      key={props.userId}
      data-option-id={props.userId}
      onClick={props.clicked}
    >
      <p data-option-id={props.userId}>{props.options[props.userId].input}</p>
    </div>
  );
};

export default option;
