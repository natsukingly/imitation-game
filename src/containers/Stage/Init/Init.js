import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import User from '../../../components/User/User';

// import Spinner from '../../../components/UI/Spinner/Spinner';
import Note from '../../../components/UI/Spinner/Host';
// import Profile from '../../components/Profile/Profile';
import classes from './Init.css';
import * as actions from '../../../store/actions/index';

class Init extends Component {
    componentDidUpdate (){

    }

    state = {
      chatMode: false
    }

    moveForwardHandler = ( event ) => {
      this.props.startGame("question");
    }
    copyToClipboard = (text) => {

        var url = document.getElementById('invitationURL');
        var range = document.createRange();
        // console.log(url)
        range.selectNode(url);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        // alert('コピーしたッス');
    }

    copyLinkHandler = () => {

      let targetText = document.getElementById('invitationURL').textContent;
      this.copyToClipboard(targetText)
    }

    render () {

      let leader = null;

      if(this.props.leader && this.props.leader.id === this.props.cuid){
        leader = (
          <div className={classes.Leader}>
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
        invitation = (
          <div className={classes.Invitation}>
            <div className={classes.DummyInvitation}>
              <img
                src={"https://api.qrserver.com/v1/create-qr-code/?data=" + invitationURL + "&size=300x300"}
                alt="QRコード"
                className={classes.InvitationImage}
              />
            </div>
            <p className={classes.InvitationURL} id='invitationURL'>{invitationURL}</p>
            <div className={classes.Button}>
              <Button clicked={this.copyLinkHandler}>URLをコピー</Button>
            </div>
          </div>
        )
      }

      let userList = null;

      if(this.props.players){
        userList = (
          Object.keys(this.props.players).map( (userId) => {
            // let photoURL = noImage;
            // if(this.props.players[userId].image !== ''){
            //   photoURL = this.props.players[userId].image;
            // }
            return (
              <User players={this.props.players} userId={userId} key={userId} />
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

      let content = (
        <div>
          <h2 className={classes.SectionTitle}>ホスト</h2>
          {leader}
          <h2 className={classes.SectionTitle}>挑戦状</h2>
          {invitation}
          <h2 className={classes.SectionTitle}>参加ユーザー</h2>
          <div className={classes.Users}>
            {userList}
          </div>
          <Note hostName={this.props.leader.name}/>
          <div className={classes.Forward}>
            {moveForwardBtn}
          </div>
        </div>
      )



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
