import React from 'react';

import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';
// import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ProfileName.css';



const profileName = ( props ) => {

    const formElementsArray = [];
    for ( let key in props.controls ) {
        formElementsArray.push( {
            id: key,
            config: props.controls[key]
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
            changed={( event ) => props.changed( event, formElement.id, props.controls )} />
    ) );



    let Name = (
      <div style={{textAlign: 'center'}}>
        <p className={classes.Name}>{props.name}</p>
        <p onClick={props.clicked} className={classes.BackBtn}>編集</p>
      </div>
    );


    if (props.editMode === true){
      Name = (
        <div>
          <p className={classes.BackBtn}
            onClick={props.clicked}
            >戻る</p>
          <form onSubmit={props.submitted} >
            {form}
            <Button disabled={props.disableSubmit}>保存</Button>
          </form>
        </div>
      );
    }


    // a.click();


    return (
        <div className={classes.ProfileNameBox}>
          {Name}
        </div>
    );
};

export default profileName;
