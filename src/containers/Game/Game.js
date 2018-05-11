import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//

import Init from '../Stage/Init/Init';
import Question from '../Stage/Question/Question';
import Options from '../Stage/Options/Options';
import Outcome from '../Stage/Outcome/Outcome';
import FinalResult from '../Stage/FinalResult/FinalResult';
import NoLeader from '../Stage/NoLeader/NoLeader';

import Button from '../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
import classes from './Game.css';
import * as actions from '../../store/actions/index';

class Game extends Component {
    componentDidMount (){
      this.props.checkGameStatus();
      this.props.checkPlayerStatus();
      this.props.checkUserGamingStatus();
      window.scrollTo(0, 0)
    }

    // componentWillUnmount(){
    //   this.props.checkGameStatus();
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
          case 'finalResult':
            content = <FinalResult />;
            break;
          case 'noLeader':
            content = <NoLeader />;
            break;
          default:
            content = null;
        }

        if(this.props.isGaming === false){
          content = null;
        }

        let editBtn = null;
        if(this.props.editReminder){
          editBtn = (
            <div className={classes.ReminderSection}>
              <Button btnType="Reminder"><Link to='/'>プロフィールを完成させよう！</Link></Button>
            </div>
          )
        }



        return (
          <div>
            {editBtn}
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
        gameStage: state.game.stage,
        editReminder: state.user.edited === false,
        messages: state.game.messages,
        isGaming: state.game.userIsGaming,
    };
}

const mapDispatchToProps = dispatch => {
  return {
    gameWillAnimate: () => dispatch( actions.gameWillAnimate()),
    gameHasAnimated: () => dispatch( actions.gameHasAnimated()),
    checkGameStatus: () => dispatch( actions.checkGameStatus() ),
    checkPlayerStatus: () => dispatch( actions.checkPlayerStatus() ),
    checkUserGamingStatus: () => dispatch( actions.checkUserGamingStatus() ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
