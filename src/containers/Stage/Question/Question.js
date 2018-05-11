import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import User from '../../../components/User/User';
// import Spinner from '../../../components/UI/Spinner/Spinner';
import Note from '../../../components/UI/Spinner/Host';

import classes from './Question.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class Question extends Component {
    constructor() {
      super();
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.countDown = this.countDown.bind(this);
    }

    componentDidMount (){
      this.props.setQuestion()
      this.props.setPresetOptions()
      this.props.checkPlayerStatus();

      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar});
      this.timer = setInterval(this.countDown, 1000);
    }

    state = {
        controls: {
            input: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'あなたの回答 [最大１００文字]'
                },
                value: '',
                validation: {
                    required: true,
                    maxLength: 100
                },
                valid: false,
                touched: false
            },
        },
        errorMessage: false,
        time: {},
        seconds: 30,
        actualSeconds: '',
        actualCountDown: '',
    }
    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
        if(this.state.errorMessage === true){
          this.setState({ errorMessage: false })
        }

    }
    submitHandler = ( event ) => {
      event.preventDefault();
      if(this.state.controls.input.value === this.props.correctAnswer || this.state.controls.input.value === this.props.dummyAnswer){

        this.setState({ errorMessage: true })
      } else {
        this.props.submitInput( this.state.controls.input.value.replace(/。/g, ''));
      }
    }

    moveForwardHandler = ( event ) => {
      this.props.moveForward("options");
    }



    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));

      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);

      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);

      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }


    startTimer() {
      if (this.timer === 0) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }

    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      let date = new Date() ;
      let a = date.getTime() ;
      let currentTime = Math.floor( a / 1000 ) ;
      let actualTime = currentTime - this.props.time
      let actualCountDown = this.props.time + 30 - currentTime
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        currentTime: currentTime,
        actualTime: actualTime,
        actualCountDown: actualCountDown
      });

      // Check if we're at zero.
      if (seconds === 0) {
        clearInterval(this.timer);
      }
    }


    render () {

      console.log(this.state.time)
      console.log(this.state.actualCountDown)


      const formElementsArray = [];
      for ( let key in this.state.controls ) {
          formElementsArray.push( {
              id: key,
              config: this.state.controls[key]
          } );
      }

      let input = formElementsArray.map( formElement => (
          <Input
              key={formElement.id}
              elementType={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
      ) );

      let disableSubmit = false;

      if(this.state.controls['input'].valid === false){
        disableSubmit = true;
      }

      let errorMessage = null;

      if(this.state.errorMessage === true){
        errorMessage = <p className={classes.ErrorMessage}>提出できない回答です</p>;
      }

      let form = (
          <form onSubmit={this.submitHandler}>
              {input}
              {errorMessage}
              <Button disabled={disableSubmit}>　提　出　</Button>
          </form>
        );


      let question = null;

      if(this.props.question && this.props.gameType === 'imaginationGame' && this.props.players){
        let targetUserName = this.props.players[this.props.targetId].name
        question = this.props.question.replace( /!/g , targetUserName ).replace( /！/g , targetUserName ) ;
      } else if(this.props.question ){
        question = this.props.question
      }




      let stageCount = null;

      if(this.props.gameStage){
        stageCount = this.props.gameStage + "/" + this.props.gameLength;
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
          <div className={classes.Question}>
            <p style={{textAlign: 'center'}}>{stageCount}</p>
            <p style={{textAlign: 'center'}} className={classes.QuestionBody}>{question}</p>
            {form}
            <p className={classes.Hint} style={{textAlign: 'center'}}>「〇〇」と表示されている場合でも回答は二文字に限定されません。</p>
          </div>
        );
      } else if (this.props.playerStatus && this.props.playerStatus === true && this.props.players){
        content = (
          <div >
            <h2 className={classes.SectionTitle}>回答未提出のユーザー</h2>
            <div className={classes.Users}>
              {userList}
            </div>
            {/* <div className={classes.Loading}>
              <Spinner />
            </div> */}
            <Note hostName={this.props.leader.name}/>
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
      cuid: state.user.id,
      gameId: state.game.id,
      gameType: state.game.gameType,
      gameStatus: state.game.status,
      gameStage: state.game.stage + 1,
      gameLength: state.game.info.length,
      question: state.game.question,
      leader: state.game.players[state.game.leader],
      correctAnswer: state.game.correctAnswer,
      dummyAnswer: state.game.dummyAnswer,
      leaderId: state.game.leader,
      judgeId: state.game.judge,
      targetId: state.game.target,
      time: state.game.time
    };
}

const mapDispatchToProps = dispatch => {
  return {
    setPresetOptions: () => dispatch( actions.setPresetOptions()),
    setQuestion: () => dispatch( actions.setQuestion() ),
    submitInput: (input) => dispatch( actions.submitInput(input) ),
    moveForward: (nextStage) => dispatch( actions.moveForward(nextStage)),
    checkPlayerStatus: () => dispatch( actions.checkPlayerStatus() ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
