import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import asyncComponent from './hoc/asyncComponent/asyncComponent';
import MetaTags from './metaTags';


import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Terms from './containers/Info/Terms';
import Home from './containers/Home/Home';
import Loading from './containers/Loading/Loading';
import GameMenu from './containers/GameMenu/GameMenu';
import Game from './containers/Game/Game';
import Rules from './containers/Rules/Rules';
import Logout from './containers/Auth/Logout/Logout';
import ExitGame from './containers/Game/ExitGame/ExitGame';
// import ExitGameToResult from './containers/Game/ExitGameToResult/ExitGameToResult';
// import FinalResult from './containers/FinalResult/FinalResult';
import Invitation from './containers/Invitation/Invitation';
import Spinner from './components/UI/Spinner/Spinner';
import classes from './App.css';
import * as actions from './store/actions/index';

// const asyncCheckout = asyncComponent(() => {
//   return import('./containers/Checkout/Checkout');
// });

// const asyncOrders = asyncComponent(() => {
//   return import('./containers/Orders/Orders');
// });

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });

class App extends Component {
  componentDidMount () {
    this.props.checkUserStatus()
    this.props.checkUserGamingStatus()
    window.scrollTo(0, 0)
  }



  render () {


    let routes = (
      <Switch>
        <Route path="/" render={() => <div className={classes.Loading}><Spinner /></div>}/>

      </Switch>
    );


    if(this.props.isAuthenticated === true && this.props.isGaming === true){
      routes = (
        <Switch>
          <Route path="/game" component={Game} />
          <Route path="/" exact component={Home} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/logout" component={Logout} />
          <Route path="/exit-game" component={ExitGame} />
          <Route path="/rules" component={Rules} />
          <Route path="/invitation/:id" component={Invitation} />
          <Redirect to="/game" />
        </Switch>
      );
    } else if ( this.props.isAuthenticated === true){
      routes = (
        <Switch>
          <Route path="/invitation/:id" component={Invitation} />
          <Route path="/game-menu" component={GameMenu} />
          {/* <Route path="/checkout" component={asyncCheckout} /> */}
          {/* <Route path="/orders" component={asyncOrders} /> */}
          <Route path="/rules" component={Rules} />
          <Route path="/logout" component={Logout} />
          <Route path="/loading" component={Loading} />
          <Route path="/terms" exact component={Terms} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    } else if (this.props.isAuthenticated === false){
      routes = (
        <Switch>
          <Route path="/terms" exact component={Terms} />
          <Route path="/" component={Auth} />
        </Switch>
      );
    }


    return (
      <div className={classes.Layout}>
        <MetaTags />
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}
// 1
const mapStateToProps = state => {
  return {
    isAuthenticated: state.user.isAuthenticated,
    isGaming: state.game.userIsGaming
  };
};
// 2
const mapDispatchToProps = dispatch => {
  return {
    checkUserStatus: () => dispatch( actions.checkUserStatus() ),
    checkUserGamingStatus: () => dispatch( actions.checkUserGamingStatus() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
