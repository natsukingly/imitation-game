import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div>
                    <p className={classes.UserName}><span className={classes.UserNameTitle}>ユーザー名:</span><br/>{props.userName}</p>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth} isGaming={props.isGaming}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;
