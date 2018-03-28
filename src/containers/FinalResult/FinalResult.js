import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Aux from '../../hoc/Aux/Aux';
import Button from '../../components/UI/Button/Button';
import classes from './FinalResult.css';
// import * as actions from '../store/actions/index';

class FinalResult extends Component {
    componentDidMount (){
      // this.props.setPresetOptions();
      // this.props.getPlayerRanking();
    }

    render (){

      let ranking = null;
      let winner = null;

      if(this.props.ranking){
        ranking = (
          Object.keys(this.props.ranking).map( (uid) =>
            {
              return (
                this.props.ranking[uid]
              )
            }
          )
        );
        ranking.sort(function(a,b){
          if(a.score > b.score) return -1;
          if(a.score < b.score) return 1;
          return 0;
        });
        winner = ranking.map((rankedUser, index) => {
          return (
            <h2>{this.props.players[rankedUser.uid].name}</h2>
          );
        })
        winner = winner[0];
      }

      let content = null;
      if(winner !== null){
        content = (
          <div>
            <div className={classes.Winner}>
              {winner}
              <p>
                さんの勝利です。
              </p>
            </div>
            <NavLink to='/'>
              <Button
              >トップに戻る</Button>
            </NavLink>
          </div>
        );
      } else {
        content = (
          <div>
            <div className={classes.Winner}>
              <h2>
                このゲームは既に終了しました。
              </h2>
            </div>
            <NavLink to='/'>
              <Button
              >トップに戻る</Button>
            </NavLink>
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
      players: state.game.players,
      isGaming: state.user.isGaming,
      ranking: state.game.score,
    };
}

// const mapDispatchToProps = dispatch => {
//     return {
//
//     }
// }

export default connect(mapStateToProps, null)(FinalResult);
