import React from 'react';

import noImage from '../../../assets/images/no-image.png';
import CloudIcon from '../../Icon/CloudIcon';
import classes from './ProfileImage.css';



const profileImage = ( props ) => {

    let PhotoURL = noImage;


    if (props.photoURL !== null){
      PhotoURL = props.photoURL.replace('_normal', '');
    }

    return (
        <div className={classes.ProfileImageBox}>
          <CloudIcon />
          <img src={PhotoURL} alt="userImage" className={classes.ProfileImage} />
        </div>
    );
};

export default profileImage;
