import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';


// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
// import classes from './Home.css';
// import * as actions from '../../store/actions/index';

class Standby extends Component {
    componentDidUpdate (){

    }


    render () {
        return (
          <div>
            <p style={{textAlign: 'center'}}>Standby</p>
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {

    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps, null)(Standby);
