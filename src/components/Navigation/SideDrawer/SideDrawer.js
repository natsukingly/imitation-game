import React from 'react';

// import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = ( props ) => {
    let attachedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open];
    }
    let invitation = null;
    if (props.invitationURL){

      invitation = (
        <div>
          <p className={classes.InvitationTitle}>招待状QRコード</p>
          <div className={classes.DummyInvitation}>
            <img
              src={"https://api.qrserver.com/v1/create-qr-code/?data=" + props.invitationURL + "&size=150x150"}
              alt="QRコード"
              className={classes.InvitationImage}
            />
          </div>
        </div>
      )
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div>
                    <p className={classes.UserName}><span className={classes.UserNameTitle}>ユーザー名:</span><br/>{props.userName}</p>
                </div>
                <nav>
                    <NavigationItems
                      isAuthenticated={props.isAuth}       isGaming={props.isGaming}
                      modalOpened={props.modalOpened}
                    />
                </nav>
                {invitation}
            </div>

        </Aux>
    );
};

export default sideDrawer;
