import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import bkg from '../../assets/images/bkg.png';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        let toolbar = null;

        let attachedClasses = [classes.Content];

        if(this.props.isAuthenticated !== true) {
            attachedClasses = [classes.Content, classes.Home];
        }

        if(this.props.isAuthenticated){
          toolbar = (
            <Toolbar
                drawerToggleClicked={this.sideDrawerToggleHandler} />
          );
        }

        return (
            <Aux>
                <div className={classes.BkgOverlay} style={{backgroundImage: 'url(' + bkg + ')'}}></div>
                {toolbar}
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    isGaming={this.props.isGaming}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    userName={this.props.userName}
                />
                <main className={attachedClasses.join(' ')}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isGaming: state.game.userIsGaming,
        userName: state.user.name
    };
};

export default connect( mapStateToProps )( Layout );
