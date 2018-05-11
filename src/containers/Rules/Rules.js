import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Rule from '../../components/Rule/Rule';
import classes from './Rules.css';

class Rules extends Component {
    componentDidMount (){

    }

    scrollTop = () => {
      let scrollStep = -window.scrollY / (500 / 15),
      scrollInterval = setInterval(function(){
        if ( window.scrollY !== 0 ) {
            window.scrollBy( 0, scrollStep );
        }
        else clearInterval(scrollInterval);
      },15);
    }

    render () {

        return (
          <div>
            <NavLink to="/"><p className={classes.ToTopLink}>TOPに戻る</p></NavLink>
            <Rule clicked={this.scrollTop} />
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


export default connect(mapStateToProps, null)(Rules);
