import React, { Component } from 'react';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';
import Profile from '../../components/Profile/Profile';

class Home extends Component {
    componentDidUpdate (){

    }
    // componentwillMount (){
    //   this.props.
    // }

    render () {
        // let profile = <Spinner />;
        // // {salad: true, meat: false, ...}
        // if ( this.props.user ) {
        //     profile = (
        //       <Profile />
        //     );
        //   }
        return (
          this.props.user ? <Profile user={this.props.user} /> : <Spinner />
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps, null)(Home);
