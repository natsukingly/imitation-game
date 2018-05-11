import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';
//
//
// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
// import classes from './Loading.css';
// import * as actions from '../../store/actions/index';

class Loading extends Component {
    componentDidMount (){

    }


    render () {


        let content = (
          <div>
          </div>
        );


        return (
          <div>
            {content}
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        id: state.user.id,
        name: state.user.name,
        image: state.user.image,
        isGaming: state.game.userIsGaming,
        loading: state.user.loading
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps, null)(Loading);
