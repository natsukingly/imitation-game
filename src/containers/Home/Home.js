import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';


import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Profile from '../../components/Profile/Profile';
import classes from './Home.css';
// import * as actions from '../../store/actions/index';

class Home extends Component {
    componentDidMount (){

    }


    render () {

        let menu = null;

        if(this.props.isGaming){
          menu = (
            <div className={classes.MenuBox}>
              <NavLink to='/game-menu' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ゲームに戻る</Button>
              </NavLink>
              <NavLink to='/exit-game' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ゲームを止める</Button>
              </NavLink>
              <NavLink to='/game-menu' activeClassName={classes.ManuLink}>
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
              <NavLink to='/game-menu' activeClassName={classes.ManuLink}>
                <Button btnType="Menu">ルールの説明</Button>
              </NavLink>
            </div>
          );
        }
        let profile = null;
        if(this.props.isGaming !== true){
          profile = (
            <Profile />
          );
        } else if (this.props.isGaming === true){
          profile = (
            <div className={classes.Note}>
              <h2 className={classes.SectionTitle}>NOTE</h2>
              <p>ゲーム中はプロフィールを編集できません。</p>
            </div>
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
            <div>
              <Spinner />
            </div>
          );
        }

        return (
          <div>
            {content}
          </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        id: state.user.id,
        name: state.user.name,
        image: state.user.image,
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
