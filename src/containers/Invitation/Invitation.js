
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import Aux from '../../hoc/Aux/Aux';
import classes from './Invitation.css';
import * as actions from '../../store/actions/index';

class Invitation extends Component {
    componentDidMount () {
      this.props.getGameInfo(this.props.match.params.id)
    }

    submitHandler = () => {
      // console.log("joinGame")
      this.props.joinGame(this.props.match.params.id);
    }


    render () {

        let content = <div className={classes.Invitation}><Spinner /></div>;

        if(this.props.invitationInfo && this.props.loading !== true && this.props.invitationInfo.info.status === 'init'){
          content = (
            <div className={classes.Invitation}>
              <h2 className={classes.Leader}>
                {this.props.invitationInfo.players[this.props.match.params.id].name}
              </h2>
              <p>のゲームに参加しますか？</p>
              <Button clicked={this.submitHandler}>はい</Button>
              <Link to="/"><Button>いいえ</Button></Link>
            </div>
          );
        } else if(this.props) {
          content = (
            <div className={classes.Invitation}>
              <p>このゲームの受付は終了しました。</p>
              <Link to="/"><Button>戻る</Button></Link>
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
        // isValid: state.game.invitationInfo.info.status === 'init',
        invitationInfo: state.game.invitationInfo,
        loading: state.game.loading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getGameInfo: (gameId) => dispatch(actions.getGameInfo(gameId)),
        joinGame: (gameId) => dispatch(actions.joinGame(gameId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
