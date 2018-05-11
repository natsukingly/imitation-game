import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect} from 'react-router-dom';

import Aux from '../Aux/Aux';
// import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import classes from './Layout.css';
import bkg from '../../assets/images/bkg.png';
import Chat from '../../containers/Chat/Chat';
import ChatIcon from '../../components/Icon/Chat';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import * as actions from '../../store/actions/index';

class Layout extends Component {

    componentDidMount(){
      this.setState( { showModalLayout: false, showBackdropLayout: false } );
      // this.scrollToBottom();
    }


    componentWillReceiveProps(nextProps){
      if(this.props.newMessage){
        if(this.props.newMessage !== null && this.props.newMessage !== nextProps.newMessage && this.state.chatMode !== true){
          this.setState({ newMessage: true})
          console.log('newMessage received')
        }
      }
      if(this.props.gameStatus === 'options' && nextProps.gameStatus === 'outcome'){
        this.props.gameWillAnimate()
      }
    }


    state = {
        showSideDrawer: false,
        showBackdropLayout: false,
        showModalLayout: false,
        exitGame: false,
        chatMode: false,
        newMessage: false
    }


    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    modalClosedHandler = () => {
        this.setState( { showModalLayout: false, showBackdropLayout: false } );
    }

    exitGameHandler = () => {
      this.setState( { showModalLayout: false, showBackdropLayout: false} );
      this.props.exitGame()
    }

    modalOpenedHandler = () => {
        this.setState( { showModalLayout: true, showBackdropLayout: true } );
    }

    toolbarClickedHandler = () => {
      this.props.gameHasAnimated()
    }

    chatModeOnHandler = () => {
      this.setState({chatMode: true, newMessage: false})
      this.props.gameHasAnimated()
      // this.scrollToBottom();
    }

    chatModeOffHandler = () => {
      this.setState({chatMode: false})
    }

    // scrollToBottom = () => {
    //   this.messagesEnd.scrollIntoView({ behavior: "instant" });
    // }

    render () {
        let toolbar = null;

        let attachedClasses = [classes.Content];

        if(this.props.isAuthenticated !== true) {
            attachedClasses = [classes.Content, classes.Home];
        }

        if(this.props.isAuthenticated && this.state.chatMode !== true){
          toolbar = (
            <Toolbar
                drawerToggleClicked={this.sideDrawerToggleHandler} clicked={this.toolbarClickedHandler}/>
          );
        }
        const baseURL = window.location.host
        let invitationURL = null;
        if(this.props.isGaming){
          invitationURL = 'https://' + baseURL + '/invitation/' + this.props.gameId;
        }

        let quitGameModal = null;

        if(this.state.showModalLayout && this.props.isGaming && this.props.isLeader){
          quitGameModal = (
            <Aux>
              <Modal
                  show={this.state.showModalLayout}
                  modalClosed={this.modalClosedHandler}>
                  <p>あなたは現在ゲームのホストです。ホストが退場すると、ゲーム自体が強制終了されます。<br/>本当にゲームを終了していいですか。</p>
                  <div className={classes.ModalBtnGroup}>
                    <Button btnType="AsLink" clicked={this.exitGameHandler}>はい</Button>
                    <Button clicked={this.modalClosedHandler}>いいえ</Button>
                  </div>
              </Modal>
            </Aux>
          )
        } else if (this.state.showModalLayout && this.props.isGaming){
          quitGameModal = (
            <Aux>
              <Modal
                  show={this.state.showModalLayout}
                  modalClosed={this.modalClosedHandler}>
                  <p>本当にゲームを終了していいですか。</p>
                  <div className={classes.ModalBtnGroup}>
                    <Button btnType="AsLink" clicked={this.exitGameHandler}>はい</Button>
                    <Button clicked={this.modalClosedHandler}>いいえ</Button>
                  </div>
              </Modal>
            </Aux>
          )
        }


        if(this.state.exitGame){
          return <Redirect to='/exit-game' />;
        }
        let newMsgSign = null;
        if(this.state.newMessage){
          newMsgSign = <span className={classes.RedCircle}></span>;
        }

        let chatBtn = null;
        if(this.props.isAuthenticated){
          chatBtn = (
            <Button btnType="Chat" clicked={this.chatModeOnHandler}>{newMsgSign}<ChatIcon /></Button>
          );
        }
        if(this.state.chatMode){
          chatBtn = <Button btnType="Chat" clicked={this.chatModeOffHandler}>×</Button>;
        }

        let content = this.props.children;

        let chatMode = [classes.ChatContainer, classes.ChatOff];

        let chatShadow = [classes.ChatShadow, classes.ChatOff];

        if(this.state.chatMode){
          chatMode = [classes.ChatContainer, classes.ChatModeOn]
          chatShadow = [classes.ChatShadow, classes.ChatModeOn]
        }else{
          chatMode = [classes.ChatContainer, classes.ChatModeOff]
          chatShadow = [classes.ChatShadow, classes.ChatModeOff]
        }


        let chat = (
          <Aux>
            <div className={chatShadow.join(' ')}>
            </div>
            <div className={chatMode.join(' ')}>
              <Chat chatMode={this.state.chatMode}/>
            </div>
          </Aux>
        )


        return (
            <Aux>
                <div className={classes.BkgOverlay} style={{backgroundImage: 'url(' + bkg + ')'}}></div>
                {toolbar}
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    isGaming={this.props.isGaming}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                    modalOpened={this.modalOpenedHandler}
                    userName={this.props.userName}
                    invitationURL={invitationURL}
                />
                <main className={attachedClasses.join(' ')}>
                    {content}
                    {chat}
                    {chatBtn}
                </main>
                {quitGameModal}
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.user.isAuthenticated,
        isGaming: state.game.userIsGaming,
        isLeader: state.user.leader,
        userName: state.user.name,
        gameId: state.user.gameId,
        newMessage: state.game.newMessage,
    };
};

const mapDispatchToProps = dispatch => {
  return {
    gameWillAnimate: () => dispatch( actions.gameWillAnimate()),
    gameHasAnimated: () => dispatch( actions.gameHasAnimated()),
    exitGame: () => dispatch(actions.exitGame())
  };
};

export default connect( mapStateToProps, mapDispatchToProps  )( Layout );
