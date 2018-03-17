import React from 'react';

import classes from './Profile.css';
import ProfileName from './ProfileName/ProfileName';
import ProfileImage from './ProfileImage/ProfileImage';

const profile = ( props ) => {

    return (
        <div className={classes.Profile}>
          <ProfileImage photoURL={props.user.photoURL} />
          <p>{props.user.displayName}</p>
          <p>Name: {props.user.uid}</p>
          <p>{props.user.email}</p>
          <p>{props.user.photoUrl}</p>
        </div>
    );
};

export default profile;
