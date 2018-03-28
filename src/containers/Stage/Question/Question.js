import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import User from '../../../components/User/User';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
import classes from './Question.css';
import Input from '../../../components/UI/Input/Input';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidity } from '../../../shared/utility';


class Question extends Component {
    componentDidMount (){
      this.props.setQuestion()
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
        }
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
    }
    submitHandler = ( event ) => {
      event.preventDefault();
      this.props.submitInput( this.state.controls.input.value);
      console.log(this.state.controls.input.value);
    }

    moveForwardHandler = ( event ) => {
      this.props.moveForward("options");
    }

    render () {
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

      let form = (
          <form onSubmit={this.submitHandler}>
              {input}
              <Button disabled={disableSubmit}>　提　出　</Button>
          </form>
        );


      let question = null;

      if(this.props.question){
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

      if(this.props.gameId === this.props.cuid){
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
          </div>
        );
      } else if (this.props.playerStatus && this.props.playerStatus === true){
        content = (
          <div >
            <h2 className={classes.SectionTitle}>回答未提出のユーザー</h2>
            <div className={classes.Users}>
              {userList}
            </div>
            <h2 className={classes.SectionTitle}>Note</h2>
            <p　className={classes.Note}>ホストは自由なタイミングで次のステージにゲームを進めることができます。</p>
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
      gameId: state.user.gameId,
      gameStatus: state.game.status,
      gameStage: state.game.stage + 1,
      gameLength: state.game.info.length,
      question: state.game.question,
    };
}

const mapDispatchToProps = dispatch => {
  return {
    setQuestion: () => dispatch( actions.setQuestion() ),
    submitInput: (input) => dispatch( actions.submitInput(input) ),
    moveForward: (nextStage) => dispatch( actions.moveForward(nextStage))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
