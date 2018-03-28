import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
//
import Init from '../Stage/Init/Init';
import Question from '../Stage/Question/Question';
import Options from '../Stage/Options/Options';
import Outcome from '../Stage/Outcome/Outcome';
import Standby from '../Stage/Standby/Standby';

// import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
// import classes from './Home.css';
import * as actions from '../../store/actions/index';

class Game extends Component {
    componentDidMount (){
      this.props.checkGameStatus();
      this.props.checkPlayerStatus();

    }

    // moveForwardHandler = ( event ) => {
    //     let nextStatus = null;
    //     switch(this.props.gameStatus){
    //       case 'init':
    //         nextStatus = 'Questions';
    //         break;
    //       case 'question':
    //         nextStatus = 'options';
    //         break;
    //       case 'options':
    //         nextStatus = 'outcome';
    //         break;
    //       case 'outcome':
    //         nextStatus = 'standby';
    //         break;
    //       case 'standby':
    //         nextStatus = 'init';
    //         break;
    //       default:
    //         nextStatus = this.props.gameStatus;
    //     }
    //
    // }

    render () {

        let content = null;


        switch (this.props.gameStatus){
          case 'init':
            content = <Init />;
            break;
          case 'question':
            content = <Question />;
            break;
          case 'options':
            content = <Options />;
            break;
          case 'outcome':
            content = <Outcome />;
            break;
          case 'post-question-standby':
            content = <Standby />;
            break;
          case 'post-options-standby':
            content = <Standby />;
            break;
          case 'post-outcome-standby':
            content = <Standby />;
            break;
          default:
            content = null;
        }



        return (
          <div>
            {content}

          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        // user: state.user.user,
        gameId: state.user.gameId,
        gameStatus: state.game.status,
        gameStage: state.game.stage
    };
}

const mapDispatchToProps = dispatch => {
  return {
    checkGameStatus: () => dispatch( actions.checkGameStatus() ),
    checkPlayerStatus: () => dispatch( actions.checkPlayerStatus() ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
