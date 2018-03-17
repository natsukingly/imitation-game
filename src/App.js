import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Home from './containers/Home/Home';
import Logout from './containers/Auth/Logout/Logout';
import classes from './App.css';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

// const asyncAuth = asyncComponent(() => {
//   return import('./containers/Auth/Auth');
// });

class App extends Component {
  componentDidMount () {
    console.log('mount');
    this.props.checkUserStatus();
  }



  render () {

    let routes = (
      <Switch>
        <Route path="/" render={() => <div>Home</div>}/>
      </Switch>
    );

    if ( this.props.notAuthenticated === true) {
      routes = (
        <Switch>
          <Route path="/" component={Auth} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/" component={Home} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <div className={classes.Layout}>
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
    notAuthenticated: state.auth.user === false,
  };
};
// 2
const mapDispatchToProps = dispatch => {
  return {
    checkUserStatus: () => dispatch( actions.checkUserStatus() )
  };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( App ) );
