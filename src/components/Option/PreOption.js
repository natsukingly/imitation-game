import React from 'react';

import classes from './Option.css';

const preOption = (props) => {

  return (
    <div
      className={classes.Option}
      key={props.userId}
      data-option-id={props.userId}
      onClick={props.clicked}
    >
      <p data-option-id={props.userId}>{props.content}</p>
    </div>
  );
};

export default preOption;
