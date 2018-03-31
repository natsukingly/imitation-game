import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import classes from './FinalResult.css';
import WinnerOverlay from '../../../assets/images/winner.png';

// import * as actions from '../store/actions/index';

class FinalResult extends Component {
    componentDidMount (){
      // this.props.setPresetOptions();
      // this.props.getPlayerRanking();
    }

    render (){

      let ranking = null;
      let userRanking = null;
      let winners = null;

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
        let prevScore  = 0;
        let prevRank = 0;

        winners = ranking.map((rankedUser, index) => {
          let rank = index + 1;
          if(rankedUser.score === prevScore){
            rank = prevRank;
          } else{
            prevRank = rank;
          }
          prevScore = rankedUser.score

          if(rank === 1){
            return (
              this.props.players[rankedUser.uid].name
            );
          }
          return '';
        })
        if(winners !== null){
          for(var i = winners.length - 1; i >= 0; i--) {
            if(winners[i] === '') {
              winners.splice(i, 1);
            }
          }
          winners = winners.join(' & ')
        }

        prevScore  = 0;
        prevRank = 0;

        userRanking = ranking.map((rankedUser, index) => {
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
                <p>最終スコア：{rankedUser.score}</p>
            </div>
          );
        })
      }

      let content = null;
      if(winners !== null){
        content = (
          <div>
            <div className={classes.Winner} style={{backgroundImage: 'url(' + WinnerOverlay + ')'}}>
              <h2　className={classes.WinnerName}>{winners}</h2>
              <p>
                さんの勝利
              </p>
            </div>
            <h2 className={classes.SectionTitle}>ランキング</h2>
            <div className={classes.RankedUsers}>
              {userRanking}
            </div>
            <div className={classes.Link}>
              <Button btnType="Link"><NavLink to='/exit-game'>ゲームを終了する</NavLink></Button>
            </div>
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
            <div className={classes.Link}>
              <Button btnType="Link"><NavLink to='/'>トップに戻る</NavLink></Button>
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
