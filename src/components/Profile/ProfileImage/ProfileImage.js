import React from 'react';

import ExifOrientationImg from 'react-exif-orientation-img'
import noImage from '../../../assets/images/no-image.png';
import CloudIcon from '../../Icon/CloudIcon';
import classes from './ProfileImage.css';



const profileImage = ( props ) => {

    let PhotoURL = noImage;


    if (props.photoURL !== null && props.photoURL !== ''){
      PhotoURL = props.photoURL.replace('_normal', '');
    }

    // a.click();


    return (
        <div className={classes.ProfileImageBox}>
          <CloudIcon name={profileImage} clicked={props.clicked}/>
          <input type="file" name="UploadImageInput" onChange={props.changed} className={classes.Input} accept="image/x-png,image/gif,image/jpeg" />
          <ExifOrientationImg src={PhotoURL} alt="userImage" className={classes.ProfileImage}/>
        </div>
    );
};

export default profileImage;
