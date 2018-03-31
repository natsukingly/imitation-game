import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import noImage from '../../../assets/images/no-image.png';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
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

      if(this.props.leader && this.props.gameId === this.props.cuid){
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
                src={"https://api.qrserver.com/v1/create-qr-code/?data=" + invitationURL + "&size=300x300"}
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
            let photoURL = noImage;
            if(this.props.players[userId].image !== ''){
              photoURL = this.props.players[userId].image;
            }
            return (
              <div className={classes.User} key={userId}>
                <div style={{backgroundImage: 'url(' + photoURL + ')'}} className={classes.UserImage} alt="user_image"> </div>
                <p style={{textAlign: 'center'}}>{this.props.players[userId].name}</p>
              </div>
            );
          })
        );
      }
      // console.log(userList)

      let moveForwardBtn = null
      if(this.props.leaderId === this.props.cuid){
        moveForwardBtn = (
          <Button
            clicked={this.moveForwardHandler}
          >ゲームを開始</Button>
        )
      }

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
          <div className={classes.Loading}>
            <Spinner />
          </div>
          <div className={classes.Forward}>
            {moveForwardBtn}
          </div>
        </div>
      );
    }
}


const mapStateToProps = state => {
    return {
      cuid: state.user.id,
      // userReady:
      gameId: state.game.id,
      // gameStatus: state.game.status,
      gameStage: state.game.stage,
      players: state.game.players,
      leader: state.game.players[state.game.leader],
      leaderId: state.game.leader,
    };
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
      startGame: () => dispatch( actions.startGame())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Init);
