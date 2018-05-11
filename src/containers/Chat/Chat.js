import React, { Component } from 'react';
import { connect } from 'react-redux';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Message from '../../components/Message/Message';
import classes from './Chat.css';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Chat extends Component {


    componentDidMount(){
      this.props.setMessages();
      if(this.props.isGaming){
        this.setState({chatType: 'players'})
      } else {
        this.setState({chatType: 'universal'})
      }
      if (this.messagesEnd !== undefined){
        this.scrollToBottom();
      }
    }

    componentDidUpdate(){
      // if(this.props.messages !== null || this.props.messages !== '' ){
      //   if(this.state.initialScroll !== true){
      //     this.scrollDown()
      //   }
      // }
      this.scrollToBottom();

    }

    // shouldComponentUpdate(nextProps){
    //   // if(this.props.messages !== null && this.prop.messages !== nextProps.messagse){
    //   //   return true;
    //   // }
    //
    // }


    state = {
        controls: {
            message: {
                elementType: 'textarea',
                elementConfig: {
                    // type: 'email',
                    placeholder: 'あなたのメッセージ'
                },
                value: '',
                validation: {
                    required: false
                }
            }
        },
        errorMessage: null,
        chatType: null,
        initialScroll: null,
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
      if(this.state.controls.message.value === ''){
        this.setState({errorMessage: true})
      }else{
        if(this.state.chatType === 'players'){
          this.props.submitMessage(this.state.controls.message.value, 'players')
        }else{
          this.props.submitMessage(this.state.controls.message.value, null)
        }

        this.setState( {       controls: {
                    message: {
                        elementType: 'textarea',
                        elementConfig: {
                            // type: 'email',
                            placeholder: 'あなたのメッセージ'
                        },
                        value: '',
                        validation: {
                            required: false
                        }
                    }
                }})
      }

    }

    switchChatTypeHandler = (chatType) => {

      if(chatType === 'toPlayers'){
        this.setState({chatType: 'players'})
      } else {
        this.setState({chatType: 'universal'})
      }
    }


    scrollToBottom = () => {
      this.messagesEnd.scrollIntoView({ behavior: "instant" });
    }

    // scrollDown = () => {
    //   let scrollDownInterval = setInterval(function(){
    //     let element = document.getElementById('playerChatBox');
    //     let targetPoint = element.scrollHeight - element.clientHeight;
    //     // let targetPoint =  element.clientHeight;
    //
    //     console.log( 'tar' + targetPoint )
    //     console.log('hei' + element.scrollHeight)
    //     console.log('clihei' + element.clientHeight)
    //     console.log('scrolltop' + element.scrollTop)
    //     if ( element.scrollTop !== targetPoint ) {
    //         element.scrollBy( 0, 60 );
    //     }
    //     else clearInterval(scrollDownInterval);
    //   },15);
    //   // element.scrollTo(0, element.clientHeight)
    // }

    scrollTop = () => {
      // window.scrollTo(0,0);
      let scrollStep = -window.scrollY / (500 / 15),
      scrollInterval = setInterval(function(){
        if ( window.scrollY !== 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
      },15);
    }


    render () {


        // this.scrollDown(chatBox)

        let messages = <div className={classes.LoadingBox}></div>;

        if(this.props.messages && this.state.chatType === 'players'){
          messages = (
            Object.keys(this.props.messages).map((messageId, index) => {

              if(messageId === 'init'){
                return false;
              }
              let photoURL = '';

              if(this.props.messages[messageId].image !== ''){
                photoURL = this.props.messages[messageId].image;
              }

              return (
                // <p>{this.props.messages[messageId].content}</p>
                <Message
                  self={this.props.uid === this.props.messages[messageId].uid}
                  userName={this.props.messages[messageId].name}
                  userImage={photoURL}
                  msg={this.props.messages[messageId].content}
                  key={index}
                />
              );
            })
          )
        } else if(this.props.uMessages && this.state.chatType === 'universal'){
          messages = (
            Object.keys(this.props.uMessages).map((uMessageId, index) => {

              if(uMessageId === 'init'){
                return false;
              }
              let photoURL = '';

              if(this.props.uMessages[uMessageId].image !== ''){
                photoURL = this.props.uMessages[uMessageId].image;
              }

              return (
                // <p>{this.props.messages[messageId].content}</p>
                <Message
                  self={this.props.uid === this.props.uMessages[uMessageId].uid}
                  userName={this.props.uMessages[uMessageId].name}
                  userImage={photoURL}
                  msg={this.props.uMessages[uMessageId].content}
                  key={index}
                />
              );
            })
          )
        }
        if(messages.length === 1){
          messages = <div className={classes.NoMsgBox}>ゲーム内のプレーヤーに、<br/>メッセージを送ろう！</div>
        }



        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
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

        let errorMessage = null;

        if ( this.state.errorMessage ) {

            errorMessage = (
                <p className={classes.errorMsg}>空白のメッセージは送れません</p>
            );
        }

        let chatTypeSwitch = null;

        const activeClasses = [classes.ChatTypeSwitch, classes.ActiveSwitch]

        const disabledClasses = [classes.ChatTypeSwitch, classes.DisabledSwitch]

        if(this.props.isGaming && this.state.chatType ===　'players'){

          chatTypeSwitch = (
            <div className={classes.ChatTypeSwitchBox}>
              <p className={activeClasses.join(' ')} onClick={() => this.switchChatTypeHandler('toPlayers')}>プレーヤーのみ</p>
              <p className={classes.ChatTypeSwitch} onClick={() => this.switchChatTypeHandler('toUniversal')}>みんな</p>
            </div>
          )
        } else if(this.props.isGaming && this.state.chatType !==　'players'){
          chatTypeSwitch = (
            <div className={classes.ChatTypeSwitchBox}>
              <p className={classes.ChatTypeSwitch} onClick={() => this.switchChatTypeHandler('toPlayers')}>プレーヤーのみ</p>
              <p className={activeClasses.join(' ')} onClick={() => this.switchChatTypeHandler('toUniversal')}>みんな</p>
            </div>
          )
        } else {
          chatTypeSwitch = (
            <div className={classes.ChatTypeSwitchBox}>
              <p className={disabledClasses.join(' ')}>みんなのチャット</p>
            </div>
          )
        }

        let content = null;

        if (this.props.uid){
          content = (
            <Aux>
              <div className={classes.ChatRoom}>
                {chatTypeSwitch}
                {/* <div className={classes.SubmitBtn}>
                  <Button btnType='ScrollToTop' clicked={this.scrollDown}>　↓　</Button>
                </div> */}
                <div className={classes.ChatBox} id="playerChatBox">
                  <p className={classes.ChatRule}>過去の投稿２０件を表示中</p>
                  {messages}
                  <div　ref={(el) => { this.messagesEnd = el; }}>
                  </div>
                </div>
                {errorMessage}
                {form}

                <div className={classes.SubmitBtn}>
                  <Button btnType='MsgSubmit' clicked={this.submitHandler}>　送　信　</Button>
                </div>
                {/* <div className={classes.SubmitBtn}>
                  <Button btnType='ScrollToTop' clicked={this.scrollTop}>　↑　</Button>
                </div> */}
              </div>
            </Aux>
          );
        }

        return (
          <Aux>
            {content}
            <div　ref={(el) => { this.messagesEnd = el; }}>
            </div>
          </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        // loading: state.user.loading,
        // error: state.user.error,
        uid: state.user.id,
        isGaming: state.game.userIsGaming,
        players: state.game.players,
        messages: state.game.messages,
        uMessages: state.game.uMessages,
        newMessage: state.game.newMessage,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setMessages: () => dispatch( actions.setMessages() ),
        submitMessage: (msg, type) => dispatch( actions.submitMessage(msg, type))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Chat );
