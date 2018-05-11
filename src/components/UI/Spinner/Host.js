import React from 'react';

import classes from './Spinner.css';

const host = (props) => (
  <div className={classes.Host}>
    <p className={classes.FlashingNote}>ホスト({props.hostName})のアクションを待っています。</p>
    <p className={classes.FlashingNote}>※ホストは自由なタイミングでゲームを次のステージに進めることができます。</p>
  </div>
);

export default host;
