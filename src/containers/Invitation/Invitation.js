
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
//
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
      this.setState({joined: true})
      this.props.joinGame(this.props.match.params.id);
    }
    forceSubmitHandler = () => {
      this.setState({joined: true})
      this.props.joinGameWithForce(this.props.match.params.id);
    }

    state={
      joined: false
    }


    render () {

        let content = <div className={classes.Invitation}><Spinner /></div>;


        if(this.props.loading === true){
          content = <div className={classes.Invitation}><Spinner /></div>;
        }
        else if(this.props.isGaming && this.props.gameId === this.props.match.params.id){
          content = <Redirect to="/game"/>;
        }
        else if(this.state.joined === true){
          content = <Redirect to="/game"/>;
        }

        else if(this.props.isGaming && this.props.invitationInfo && this.props.invitationInfo.info.status === 'init'){

          content = (
            <div className={classes.Invitation}>
              <h2 className={classes.Leader}>
                {this.props.invitationInfo.players[this.props.invitationInfo.info.leader].name}
              </h2>
              <p>のゲームに参加しますか？</p>
              <p className={classes.Warning}>「はい」を選択すると今参加中のゲームから強制退場させられます。</p>
              <Button clicked={this.forceSubmitHandler}>はい</Button>
              <Link to="/"><Button>いいえ</Button></Link>
            </div>
          );
        }

        else if(this.props.invitationInfo && this.props.invitationInfo.info.status === 'init'){
          content = (
            <div className={classes.Invitation}>
              <h2 className={classes.Leader}>
                {this.props.invitationInfo.players[this.props.invitationInfo.info.leader].name}
              </h2>
              <p>のゲームに参加しますか？</p>
              <Button clicked={this.submitHandler}>はい</Button>
              <Link to="/"><Button>いいえ</Button></Link>
            </div>
          );
        } else if(this.props.invitationInfo) {
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
        loading: state.game.loading,
        isGaming: state.game.userIsGaming,
        gameId: state.user.gameId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getGameInfo: (gameId) => dispatch(actions.getGameInfo(gameId)),
        joinGame: (gameId) => dispatch(actions.joinGame(gameId)),
        joinGameWithForce: (gameId) => dispatch(actions.joinGameWithForce(gameId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
