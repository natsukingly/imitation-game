import React from 'react';

import MenuIcon from '../../../Icon/MenuIcon';
import classes from './DrawerToggle.css';

const drawerToggle = (props) => (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
        <MenuIcon />
    </div>
);

export default drawerToggle;
