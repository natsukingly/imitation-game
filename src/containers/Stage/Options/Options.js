import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Option from '../../../components/Option/Option';
import PreOption from '../../../components/Option/PreOption';
import Button from '../../../components/UI/Button/Button';
import User from '../../../components/User/User';
// import Button from '../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
import classes from './Options.css';
import * as actions from '../../../store/actions/index';

class Options extends Component {
    componentDidMount (){
      this.props.setPresetOptions()
      this.props.checkPlayerStatus();
      let  N = Object.keys(this.props.players).length + 2;
      let optionOrder = Array.apply(null, {length: N}).map(Number.call, Number)
      this.setState({optionOrder: this.shuffle(optionOrder)})
    }

    // shouldComponentUpdate(nextProps, nextState){
    //   if(this.props.correctAnswer === nextProps.correctAnswer){
    //     return false;
    //   }
    //   return true;
    // }
    state = {
      optionOrder: null
    }

    shuffle = (array) => {
        var n = array.length, i, t;

        while (n) {
          i = Math.floor(Math.random() * n--);
          t = array[n];
          array[n] = array[i];
          array[i] = t;
        }
        return array;
    }


    selectOptionHandler = (event) => {
      const optionId = event.target.getAttribute("data-option-id");
      this.props.selectOption(optionId);
    }

    moveForwardHandler = ( event ) => {
      this.props.moveForward("outcome");
    }


    render (){


      // console.log(this.state.optionOrder)

      let answers = null;
      let correctAnswer = null;
      let dummyAnswer = null;
      let shuffledAnswers = [];

      if(this.props.options && this.props.dummyAnswer && this.props.correctAnswer && this.state.optionOrder !== null){
        correctAnswer = (
          <PreOption
            content={this.props.correctAnswer}
            userId="correct"
            key="correct"
            clicked={this.selectOptionHandler}
          />
        );

        dummyAnswer = (
          <PreOption
            content={this.props.dummyAnswer}
            userId="dummy"
            key="dummy"
            clicked={this.selectOptionHandler}
          />
        );

        answers = (
          Object.keys(this.props.options).map((userId) => {
            if(this.props.options[userId].input !== ''){
              return (
                <Option
                  options={this.props.options}
                  userId={userId}
                  key={userId}
                  clicked={this.selectOptionHandler}
                />
              );
            }
            return false;
          })
        );
        answers.push(correctAnswer);
        answers.push(dummyAnswer);

        // console.log(answers)

        let orderIndex = null;
        for (var i = 0; i < this.state.optionOrder.length; i++) {
          orderIndex = this.state.optionOrder[i]
          shuffledAnswers.push(answers[orderIndex])
        }
        // console.log(shuffledAnswers)
      }

      let userList = null;
      let pendingUser = null;

      if(this.props.players){
        userList = (
          Object.keys(this.props.players).map( (userId) => {
            if(this.props.players[userId].ready === false){
              pendingUser += 1;
              return (
                <User players={this.props.players} userId={userId} key={userId}/>
              );
            } else {
              return false;
            }
          })
        );
        if (pendingUser === null){
            userList = (
              <p style={{textAlign: 'center'}}>全員準備OK<br/>[ホストの対応待ち]</p>
            )
        }
      }

      let nextBtn = null;

      if(this.props.leaderId === this.props.cuid){
        nextBtn = (
          <Button
            clicked={this.moveForwardHandler}
          >次のステージに移動</Button>
        );
      }

      let content = null;

      if(this.props.playerStatus !== true){
        content = (
          <div>
            <p className={classes.OptionsTitle}>答えを一つ選んでください。</p>
            {shuffledAnswers}
          </div>
        );
      } else if (this.props.playerStatus && this.props.playerStatus === true){
        content = (
          <div>
            <h2 className={classes.SectionTitle}>回答未提出のユーザー</h2>
            <div className={classes.Users}>
              {userList}
            </div>
            <div className={classes.Loading}>
              <Spinner />
            </div>
            <h2 className={classes.SectionTitle}>Note</h2>
            <p　className={classes.Note}>ホスト({this.props.leader.name})は自由なタイミングで次のステージにゲームを進めることができます。</p>
            <div className={classes.Forward}>
              {nextBtn}
            </div>
          </div>
        );
      }
      return (
        <Aux>
          {content}
        </Aux>
      );
    }
}


const mapStateToProps = state => {
    return {
      players: state.game.players,
      playerStatus: state.game.playerStatus,
      gameId: state.game.id,
      cuid: state.user.id,
      leader: state.game.players[state.game.leader],
      leaderId: state.game.leader,
      correctAnswer: state.game.correctAnswer,
      dummyAnswer: state.game.dummyAnswer,
      options: state.game.input,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      selectOption: (optionId) => dispatch( actions.selectOption(optionId)),
      setPresetOptions: () => dispatch( actions.setPresetOptions()),
      moveForward: (nextStage) => dispatch( actions.moveForward(nextStage)),
      checkPlayerStatus: () => dispatch( actions.checkPlayerStatus() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
