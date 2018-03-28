import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';


import Button from '../../../components/UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
// import Profile from '../../components/Profile/Profile';
import classes from './Init.css';
import * as actions from '../../../store/actions/index';

class Init extends Component {
    componentDidUpdate (){

    }

    moveForwardHandler = ( event ) => {
      this.props.startGame("question");
    }

    render () {

      let leader = null;

      if(this.props.leader && this.props.gameId === this.props.userId){
        leader = (
          <div className={classes.Leader}>
            {/* <div style={{backgroundImage: 'url(' + this.props.leader.image + ')'}} className={classes.LeaderPhoto} alt="Leader_photo"> </div> */}
            <p>あなた</p>
          </div>
        );
      } else if (this.props.leader){
        leader = (
          <div className={classes.Leader}>
            {/* <div style={{backgroundImage: 'url(' + this.props.leader.image + ')'}} className={classes.LeaderPhoto} alt="Leader_photo"> </div> */}
            <p> <strong>{this.props.leader.name}</strong>さん</p>
          </div>
        );
      }

      let invitation = (
        <div className={classes.DummyInvitation}>
        </div>
      );

      const baseURL = window.location.host
      if(this.props.gameId){
        const invitationURL = 'https://' + baseURL + '/invitation/' + this.props.gameId;
        console.log(invitationURL)
        invitation = (
          <div className={classes.Invitation}>
            <div className={classes.DummyInvitation}>
              <img
                src={"https://api.qrserver.com/v1/create-qr-code/?data=" + invitationURL + "&size=200x200"}
                alt="QRコード"
                className={classes.InvitationImage}
              />
            </div>
            <p className={classes.InvitationURL}>{invitationURL}</p>
          </div>
        )
      }

      let userList = null;

      if(this.props.players){
        userList = (
          Object.keys(this.props.players).map( (userId) => {
            return (
              <div className={classes.User} key={userId}>
                <div style={{backgroundImage: 'url(' + this.props.players[userId].image + ')'}} className={classes.UserImage} alt="user_image"> </div>
                <p>{this.props.players[userId].name}</p>
              </div>
            );
          })
        );
      }
      // console.log(userList)

      return (
        <div>
          <h2 className={classes.SectionTitle}>ホスト</h2>
          {leader}
          <h2 className={classes.SectionTitle}>招待状</h2>
          {invitation}
          <h2 className={classes.SectionTitle}>参加ユーザー</h2>
          <div className={classes.Users}>
            {userList}
          </div>
          <div className={classes.Forward}>
            <Button
              clicked={this.moveForwardHandler}
            >ゲームを開始</Button>
          </div>
        </div>
      );
    }
}


const mapStateToProps = state => {
    return {
      userId: state.user.id,
      // userReady:
      gameId: state.user.gameId || state.game.leader.gameId,
      // gameStatus: state.game.status,
      gameStage: state.game.stage,
      players: state.game.players,
      leader: state.game.leader
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      startGame: () => dispatch( actions.startGame())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Init);
