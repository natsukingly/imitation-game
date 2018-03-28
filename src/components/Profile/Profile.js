import React, { Component } from 'react';
import { connect } from 'react-redux';

import classes from './Profile.css';
import ProfileName from './ProfileName/ProfileName';
import ProfileImage from './ProfileImage/ProfileImage';
import Spinner from '../UI/Spinner/Spinner';

import * as actions from '../../store/actions/index';
import { updateObject, checkValidity } from '../../shared/utility';

class Profile extends Component {
    state = {
      controls: {
          name: {
              elementType: 'input',
              elementConfig: {
                  type: 'text',
                  placeholder: '名前 [最大15文字]'
              },
              value: '',
              validation: {
                  required: true,
                  maxLength: 15
              },
              valid: false,
              touched: false
          },
      },
      editMode: false,
      displayName: '',
      photoURL: '',
    }

    componentDidMount(){

    }


    inputChangedHandler = ( event, controlName, controls ) => {
        const updatedControls = updateObject( controls, {
            [controlName]: updateObject( controls[controlName], {
                value: event.target.value,
                valid: checkValidity( event.target.value, controls[controlName].validation ),
                touched: true
            } )
        } );
        this.setState( { controls: updatedControls } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.updateName( this.state.controls.name.value);
        this.setState( prevState => {
            return { editMode: !prevState.editMode };
        } );
    }

    switchEditModeHandler = () => {
        this.setState( prevState => {
            return { editMode: !prevState.editMode };
        } );
    }

    startUploadingHandler(){
      const a = document.getElementsByName("UploadImageInput");
      a[0].click();
    }

    saveUploadingHandler= (event) => {

      this.props.uploadImage(event.target.files[0]);
      // this.props.uploadImage(file, this.props.user.uid);
    }

    render () {

      let disableSubmit = false;

      if(this.state.controls['name'].valid === false){
        disableSubmit = true;
      }

      let name = this.props.name;

      // if(this.props.id !== null && name === null ){
      //   name = "Player-" + this.props.id.slice(0, 5);
      // }

      let profile = null;

      if(this.props.id !== null){
        profile = (
          <div className={classes.Profile}>
            <ProfileImage photoURL={this.props.image} clicked={this.startUploadingHandler} changed={this.saveUploadingHandler} />
            <ProfileName
              controls={this.state.controls}
              editMode={this.state.editMode}
              changed={this.inputChangedHandler}
              clicked={this.switchEditModeHandler}
              submitted={this.submitHandler}
              disableSubmit={disableSubmit}
              name={name}
            />
          </div>
        );
      }



      return (
          <div>
            {profile}
            <p style={{textAlign: 'center'}}>{this.props.id}</p>
          </div>
      );
    }
}

const mapStateToProps = state => {
  return{
    id: state.user.id,
    name: state.user.name,
    image: state.user.image,
    error: state.user.error,
    updated: "true",
  };
};

const mapDispatchToProps = dispatch => {
    return {
      uploadImage: (file) => dispatch( actions.uploadImage(file)),
      updateName: (name) => dispatch (actions.updateName(name))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Profile );
