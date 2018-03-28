import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import Logo from '../../components/Logo/Logo';
import classes from './Auth.css';
import Aux from '../../hoc/Aux/Aux';
import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        emailMode: false
    }


    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = updateObject( this.state.controls, {
            [controlName]: updateObject( this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
      event.preventDefault();
      this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value);
    }

    submitTwitterHandler = ( event ) => {
      event.preventDefault();
      this.props.onAuthViaTwitter();
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return { emailMode: !prevState.emailMode };
        } );
    }


    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        let errorMessage = null;

        if ( this.props.error ) {
            errorMessage = (
                <p>{this.props.error.message}</p>
            );
        }



        // let authRedirect = null;
        // if ( this.props.isAuthenticated ) {
        //     authRedirect = <Redirect to={this.props.authRedirectPath} />
        // }

        let loginForm = (
          <div
            className={classes.LoginBtns}
            >
            <Button
                clicked={this.submitTwitterHandler}
                >Twitterで続ける</Button>

            <Button
                clicked={this.switchAuthModeHandler}
            >Emailで続ける</Button>
          </div>
        );

        if(this.state.emailMode) {
          loginForm = (
            <form onSubmit={this.submitHandler}>
                <p className={classes.BackBtn}
                  onClick={this.switchAuthModeHandler}
                  >戻る</p>
                {form}
                <Button>SUBMIT</Button>
            </form>
          );
        }

        if ( this.props.loading ) {
            loginForm = <div><Spinner /></div>;
        }
        
        let top = null;

        if (this.props.uid === null || this.props.uid === false){
          top = (
            <Aux>
              <h1 className={classes.Title}>IMITATION<br/>GAME</h1>
              <Logo />
              <div className={classes.Auth}>
                {errorMessage}
                {loginForm}

              </div>
            </Aux>
          );
        }

        return (
          <Aux>
            {top}

          </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.user.loading,
        error: state.user.error,
        uid: state.user.id,
        // authRedirectPath: state.auth.authRedirectPath,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password) => dispatch( actions.auth( email, password) ),
        onAuthViaTwitter: () => dispatch( actions.authViaTwitter())
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );
