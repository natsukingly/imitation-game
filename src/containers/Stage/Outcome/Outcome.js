import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import noImage from '../../../assets/images/no-image.png';
import HappyOverlay from '../../../assets/images/correct.png';
import Logo from '../../../components/Logo/Logo';
import Comments from '../../../components/Comments/Comments';
import OptionAnswer from '../../../components/Option/OptionAnswer';
import Button from '../../../components/UI/Button/Button';
import User from '../../../components/User/User';
// import Button from '../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
import classes from './Outcome.css';
import * as actions from '../../../store/actions/index';

class Options extends Component {
    componentDidMount (){
      this.props.setPresetOptions();
      this.props.checkPlayerStatus();
      window.scrollTo(0,0);
      // this.props.getPlayerRanking();
    }

    moveToNextQuestionHandler = ( event ) => {
      this.props.moveToNextQuestion();
    }

    moveToFinalResult = ( event ) => {
      this.props.moveToFinalResult();
    }

    setPlayerReadyHandler = ( event ) => {
      this.props.setPlayerReady();
    }


    render (){

      let result = null;

      if(this.props.output){

        const userId = this.props.output[this.props.cuid].output


        switch(this.props.output[this.props.cuid].output){
          case "correct":
            result = (
              <div>
                <div className={classes.Overlay} style={{backgroundImage: 'url(' + HappyOverlay + ')'}}></div>
                <h3 className={classes.Three}>3</h3>
                <h3 className={classes.Two}>2</h3>
                <h3 className={classes.One}>1</h3>
                <div className={classes.ResultStatement}>
                  <h2>正解</h2>
                  <p>オメデトウ</p>
                </div>
              </div>
            );
            break;
          case "dummy":
            result = (
              <div>
                <h3 className={classes.Three}>3</h3>
                <h3 className={classes.Two}>2</h3>
                <div className={classes.ResultStatementEarly}>
                  <Logo size="large"/>
                  <h2>不正解♡</h2>
                </div>
              </div>
            );
            break;
            case "":
              result = (
                <div>
                  <h3 className={classes.Three}>3</h3>
                  <h3 className={classes.Two}>2</h3>
                  <h3 className={classes.One}>1</h3>
                  <div className={classes.ResultStatement}>
                    <Logo size="large"/>
                    <h2>不正解w</h2>
                  </div>
                </div>
              );
              break;
          case this.props.cuid:
              result = (
                <div>
                  <Comments outcome='self' />
                  <h3 className={classes.Three}>3</h3>
                  <h3 className={classes.Two}>2</h3>
                  <h3 className={classes.One}>1</h3>
                  <div className={classes.ResultStatement}>
                    <h2>ナルシスト</h2>
                    <p>自分大好きカヨ。。。</p>
                  </div>
                </div>
              );
              break;
          default:
            result = (
              <div>
                <h3 className={classes.Three}>3</h3>
                <h3 className={classes.Two}>2</h3>
                <h3 className={classes.One}>1</h3>
                <div className={classes.ResultStatement}>
                  <h2>{this.props.players[userId].name}</h2>
                  <p>さんの答えを選びました。</p>
                </div>
              </div>
            );
        }

      }

      let answers = null;
      let correctAnswer = null;
      let dummyAnswer = null;

      if(this.props.options && this.props.dummyAnswer && this.props.correctAnswer){
        correctAnswer = (
          <OptionAnswer
            content={this.props.correctAnswer}
            userName="correct"
            userImage=""
            key="correct"
          />
        );

        dummyAnswer = (
          <OptionAnswer
            content={this.props.dummyAnswer}
            userName="dummy"
            userImage=""
            key="dummy"
          />
        );

        answers = (
          Object.keys(this.props.options).map((userId) => {
            let photoURL = noImage;

            if(this.props.players[userId].image !== ''){
              photoURL = this.props.players[userId].image;
            }
            return (
              <OptionAnswer
                options={this.props.options}
                userId={userId}
                content={this.props.options[userId].input}
                userName={this.props.players[userId].name}
                userImage={photoURL}
                key={userId}
              />
            );
          })
        );
        answers.push(correctAnswer);
        answers.push(dummyAnswer);
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

      let yourOutcome = null;
      let trickedUserList = null;

      if(this.props.output){

          yourOutcome = (
            Object.keys(this.props.output).filter( (uid) =>
              {
                if(this.props.output[uid].output === this.props.cuid){
                  return (
                    // this.props.ranking[uid]
                    this.props.output[uid].output
                  )
                }
                return false;
              }
            )
          )
          if (yourOutcome.length > 0){
            trickedUserList = (
              yourOutcome.map( (uid) =>
                {
                  let photoURL = noImage;

                  if(this.props.players[uid].image !== ''){
                    photoURL = this.props.players[uid].image;
                  }
                  return(
                    <div key={uid} className={classes.UserListItem}>
                      <div style={{backgroundImage: 'url(' + photoURL + ')'}} className={classes.UserImage} alt="user_image"> </div>
                      <p>{this.props.players[uid].name}</p>
                    </div>
                  );
                }
              )
            );
          } else {
            trickedUserList = (
              <div className={classes.UserListItem}>
                <p>誰もあなたの回答を選びませんでした。</p>
              </div>
            )
          }
      }


      let ranking = null;

      if(this.props.ranking){

        ranking = (
          Object.keys(this.props.ranking).map( (uid) =>
            {
              return (
                this.props.ranking[uid]
              )
            }
          )
        )

        ranking.sort(function(a,b){
          if(a.score > b.score) return -1;
          if(a.score < b.score) return 1;
          return 0;
        });

        let prevScore  = 0;
        let prevRank = 0;

        ranking = ranking.map((rankedUser, index) => {
          let rank = index + 1;
          if(rankedUser.score === prevScore){
            rank = prevRank;
          } else{
            prevRank = rank;
          }

          prevScore = rankedUser.score
          return (
            <div key={rankedUser.uid}　className={classes.RankedUser}>
                <h2>{rank}位　{this.props.players[rankedUser.uid].name}</h2>
                <p>現：{rankedUser.score}　←　前：{rankedUser.lastScore}</p>
            </div>
          );
        }

        )
      }


      let nextBtn = null;
      if(this.props.gameStage === this.props.gameLength){
        nextBtn = (
            <Button
              clicked={this.moveToFinalResult}
            >最終結果画面</Button>
        );
      }else if(this.props.leaderId === this.props.cuid){
        nextBtn = (
          <Button
            clicked={this.moveToNextQuestionHandler}
          >次のラウンドに移動</Button>
        );
      }


      let content = null;
      if(this.props.playerStatus !== true){
        content = (
          <div>
            <div className={classes.Result}>
              {result}
            </div>
            <div className={classes.Content}>
              <h2 className={classes.SectionTitle}>みんなの回答</h2>
              {answers}
              <h2 className={classes.SectionTitle}>あなたの回答を選んだ人</h2>
              <div className={classes.UserList}>
                {trickedUserList}
              </div>
              <h2 className={classes.SectionTitle}>ランキング</h2>
              <div className={classes.RankedUsers}>
                {ranking}
              </div>
              <div className={classes.Forward}>
                <Button
                  clicked={this.setPlayerReadyHandler}
                >次に進む</Button>
              </div>
            </div>
          </div>
        );
      } else if (this.props.playerStatus && this.props.playerStatus === true){
        content = (
          <div>
            <h2 className={classes.SectionTitle}>待機中のユーザー</h2>
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
      cuid: state.user.id,
      gameId: state.game.id,
      players: state.game.players,
      playerStatus: state.game.playerStatus,
      leader: state.game.players[state.game.leader],
      leaderId: state.game.leader,
      gameStage: state.game.stage + 1,
      gameLength: state.game.info.length,
      output: state.game.output,
      ranking: state.game.score,
      correctAnswer: state.game.correctAnswer,
      dummyAnswer: state.game.dummyAnswer,
      options: state.game.input,
    };
}

const mapDispatchToProps = dispatch => {
    return {
      setPresetOptions: () => dispatch( actions.setPresetOptions()),
      moveToFinalResult: () => dispatch( actions.moveToFinalResult()),
      moveToNextQuestion: () => dispatch( actions.moveToNextQuestion()),
      setPlayerReady: () => dispatch( actions.setPlayerReady()),
      checkPlayerStatus: () => dispatch( actions.checkPlayerStatus() ),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
