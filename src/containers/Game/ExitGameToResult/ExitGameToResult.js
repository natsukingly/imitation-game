
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class ExitGameToResult extends Component {
    componentDidMount () {
        this.props.exitGame();
    }

    render () {
        return <Redirect to="/game-result"/>;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        exitGame: () => dispatch(actions.exitGame())
    };
};

export default connect(null, mapDispatchToProps)(ExitGameToResult);
