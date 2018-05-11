import React from 'react';
import { NavLink } from 'react-router-dom';

import Button from '../../../UI/Button/Button';
import classes from './NavigationItem.css';

const navigationItem = ( props ) => {
  if(props.btn){
    return(
      <li className={classes.NavigationItem}>
          <Button clicked={props.clicked} btnType="NavigationItem">{props.children}</Button>
      </li>
    )
  } else{
    return(
      <li className={classes.NavigationItem}>
          <NavLink
              to={props.link}
              exact={props.exact}
              activeClassName={classes.active}>{props.children}</NavLink>
      </li>
    )
  }
};

export default navigationItem;
