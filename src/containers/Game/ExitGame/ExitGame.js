
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class ExitGame extends Component {
    componentDidMount () {
        this.props.exitGame();
        console.log('exitGamepage')
    }

    render () {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        exitGame: () => dispatch(actions.exitGame())
    };
};

export default connect(null, mapDispatchToProps)(ExitGame);
