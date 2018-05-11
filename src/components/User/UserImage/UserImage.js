import React from 'react';

// import ExifOrientationImg from 'react-exif-orientation-img'
// import Aux from '../../../hoc/Aux/Aux';
import classes from './UserImage.css';



const userImage = ( props ) => {

    let PhotoURL = null;
    let image = null;

    if (props.photoURL !== null && props.photoURL !== ''){
      PhotoURL = props.photoURL.replace('_normal', '');
      image = <div style={{backgroundImage: 'url(' + PhotoURL + ')'}} className={classes.UserImage} alt="user_image"> </div>;
    }


    return (
        <div className={classes.UserImageBox}>
          {image}
        </div>
    );
};

export default userImage;
