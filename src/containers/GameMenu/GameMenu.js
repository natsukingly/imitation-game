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

    selectRoundHandler = (event) => {
      const round = Number(event.target.innerHTML)
      this.props.createGame(round, this.props.id, this.props.name, this.props.image);
    }


    render () {

        let content = <div><Spinner /></div>;

        if(this.props.loading !== true ){
          content = (
            <div>
              <p className={classes.Title}>何回戦まで遊びますか？</p>
              <div className={classes.GameMenu}>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>3</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>6</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>9</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>12</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>15</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>18</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>21</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>24</Button>
                <Button btnType="GameMenu" clicked={this.selectRoundHandler}>100</Button>
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
      createGame: (round, id, name, image) => dispatch( actions.createGame(round, id, name, image))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameMenu);
