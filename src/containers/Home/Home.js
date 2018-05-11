import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';


import Aux from '../../hoc/Aux/Aux';
import Modal from '../../components/UI/Modal/Modal';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Profile from '../../components/Profile/Profile';
import classes from './Home.css';
// import * as actions from '../../store/actions/index';

class Home extends Component {
    componentDidMount (){

    }

    state = {
      showBackdrop: false,
      showModal: false,
    }
    modalClosedHandler = () => {
        this.setState( { showModal: false, showBackdrop: false } );
    }

    modalOpenedHandler = () => {
        this.setState( { showModal: true, showBackdrop: true } );
    }

    render () {

        let menu = null;

        if(this.props.isGaming){
          menu = (
            <div className={classes.MenuBox}>
              <NavLink to='/game-menu' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ゲームに戻る</Button>
              </NavLink>
              <div className={classes.MenuLink}>
                <Button btnType="Menu" clicked={this.modalOpenedHandler}>ゲームを止める</Button>
              </div>
              <NavLink to='/rules' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ルールの説明</Button>
              </NavLink>
            </div>
          );
        } else if(this.props.id !== null){
          menu = (
            <div className={classes.MenuBox}>
              <NavLink to='/game-menu' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ゲームを作成</Button>
              </NavLink>
              <NavLink to='/rules' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ルールの説明</Button>
              </NavLink>
            </div>
          );
        }
        let profile = null;
        if(this.props.id){
          profile = (
            <Profile />
          );
        }
        let quitGameModal = null;

        if(this.props.isGaming && this.props.isLeader){
          quitGameModal = (
            <Aux>
              <Backdrop show={this.state.showBackdrop} clicked={this.modalClosedHandler}/>
              <Modal
                  show={this.state.showModal}
                  modalClosed={this.modalClosedHandler}>
                  <p>あなたは現在ゲームのホストです。ホストが退場すると、ゲーム自体が強制終了されます。<br/>本当にゲームを終了していいですか。</p>
                  <div className={classes.ModalBtnGroup}>
                    <Button btnType="AsLink"><Link to='/exit-game'>はい</Link></Button>
                    <Button clicked={this.modalClosedHandler}>いいえ</Button>
                  </div>
              </Modal>
            </Aux>
          )
        } else if (this.props.isGaming){
          quitGameModal = (
            <Aux>
              <Backdrop show={this.state.showBackdrop} clicked={this.modalClosedHandler}/>
              <Modal
                  show={this.state.showModal}
                  modalClosed={this.modalClosedHandler}>
                  <p>本当にゲームを終了していいですか。</p>
                  <div className={classes.ModalBtnGroup}>
                    <Button btnType="AsLink"><Link to='/exit-game'>はい</Link></Button>
                    <Button clicked={this.modalClosedHandler}>いいえ</Button>
                  </div>
              </Modal>
            </Aux>
          )
        }

        let content = (
          <div>
            {profile}
            {menu}
          </div>
        );

        if (this.props.loading) {
          content = (
            <div className={classes.Loading}>
              <Spinner />
            </div>
          );
        }

        return (
          <div>
            {content}
            {quitGameModal}
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        id: state.user.id,
        name: state.user.name,
        image: state.user.image,
        isLeader: state.user.leader,
        isGaming: state.game.userIsGaming,
        loading: state.user.loading
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps, null)(Home);
