import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Toolbar.css';
// import Logo from '../../Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Link to='/'>
              <p className={classes.logo}>IMITATION <br/> GAME</p>
            </Link>
        </div>
        <DrawerToggle clicked={props.drawerToggleClicked} />
    </header>
);

export default toolbar;
