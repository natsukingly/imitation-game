import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './GameMenu.css';
import * as actions from '../../store/actions/index';

class GameMenu extends Component {
    componentDidUpdate (){

    }

    state = {
      gameType: '',
      roundMode: false
    }

    selectRoundHandler = (event) => {
      const round = Number(event.target.innerHTML)
      this.props.createGame(this.state.gameType, round);
    }

    selectGameTypeHandler = (gameType) => {
      this.setState({gameType: gameType})
    }

    resetGameTypeHandler = () => {
      this.setState({gameType: ''})
    }

    render () {
        let pinkBtn =  [classes.GameTypeBtn, classes.Pink];
        let blueBtn =  [classes.GameTypeBtn, classes.Blue];

        let resetBtn = null;

        if(this.state.gameType !== ''){
          resetBtn = (
            <Button btnType="ResetBtn" clicked={this.resetGameTypeHandler}>戻る</Button>
          )

        }

        let content = <div className={classes.Loading}><Spinner /></div>;


        if(this.props.loading !== true && this.state.gameType === ''){
          content = (
            <div>
              <p className={classes.Title}>どのデッキで遊ぶ？</p>
              <div className={classes.GameMenuType}>
                <div
                  className={blueBtn.join(' ')}
                  onClick={() => this.selectGameTypeHandler('imitationGame')}
                >
                  <h2>真実のデッキ</h2>
                  <p>でっち上げの真実でお互いを騙そう！</p>
                  <ul>
                    <li>オススメの人数：３人＋</li>
                    <li>必ず答えがあります</li>
                  </ul>
                </div>

                <div
                  className={pinkBtn.join(' ')}
                  onClick={() => this.selectGameTypeHandler('imaginationGame')}
                  >
                  <h2>友情のデッキ</h2>
                  <p>「もし〇〇君がXXXだったら」的な妄想ゲーム</p>
                  <ul>
                    <li>オススメの人数：４人＋</li>
                    <li>答えはありません</li>
                    <li>知っている人と遊ぶともっと楽しい</li>
                  </ul>
                </div>

              </div>
            </div>
          )
        } else if(this.props.loading !== true && this.state.gameType !== ''){
          content = (
            <div>
              <p className={classes.Title}>何回戦まで遊ぶ？</p>
              <div className={classes.GameMenu}>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>1</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>3</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>6</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>9</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>12</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>15</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>18</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>20</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>30</Button>

              </div>
              <div className={classes.ResetBtn}>
                {resetBtn}
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
      id: state.user.id,
      name: state.user.name,
      image: state.user.image,
      isGaming: state.user.isGaming,
      loading: state.game.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
      createGame: (gameType, round) => dispatch( actions.createGame(gameType, round))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
