import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Aux from '../../../hoc/Aux/Aux';
import Button from '../../../components/UI/Button/Button';
import classes from './NoLeader.css';
// import WinnerOverlay from '../../../assets/images/winner.png';

// import * as actions from '../store/actions/index';

class FinalResult extends Component {
    componentDidMount (){
      // this.props.setPresetOptions();
      // this.props.getPlayerRanking();
    }

    render (){

      let ranking = null;
      let userRanking = null;


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
        let prevScore  = null;
        let prevRank = 0;

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

      if(this.props.players){
        content = (
          <div>
            <h2 className={classes.SectionTitle}>ゲームの終了</h2>
            <p　className={classes.Note}>ホストが退場したため、ゲームを終了しました。</p>
            <h2 className={classes.SectionTitle}>ランキング</h2>
            <div className={classes.RankedUsers}>
              {userRanking}
            </div>
            <div className={classes.Link}>
              <Button btnType="Link"><NavLink to='/exit-game'>退場</NavLink></Button>
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
