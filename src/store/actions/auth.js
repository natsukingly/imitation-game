import firebase from 'firebase';
import * as actionTypes from './actionTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (user) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        loading: false,
        user: user
    };
};

export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: true
    };
};

export const logout = () => {
  return dispatch => {
      firebase.auth().signOut()
        .then( dispatch(logoutSuccess()));
  };
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.AUTH_LOGOUT_SUCCESS
    };
};

export const initSuccess = () => {
    return {
        type: actionTypes.INIT_SUCCESS
    };
};


export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
    };
};

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then((user) => dispatch(authSuccess(user)))
          .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(data => dispatch(authSuccess(data)))
              .catch(() => dispatch(authFail()));
          });
    };
};

// export const improveTwitterPhoto = (data) => {
//   console.log('here!');
//   const currentUser = firebase.auth().currentUser;
//   console.log(currentUser);
//   const newPhotoURL = data.user.photoURL.replace('_normal', '');
//   console.log(data);
//   console.log(newPhotoURL);
//   console.log("aaaaa");
//   currentUser.updateProfile({photoURL: newPhotoURL});
//
// };

export const authViaTwitter = () => {
  return dispatch => {
    dispatch(authStart());
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then(dispatch(checkUserStatus()))
      .catch(() => dispatch(authFail()));
  };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};
//
// export const getCurrentUser= () => {
//   return dispatch => {
//     dispatch(authStart());
//     firebase.auth().currentUser()
//       .then((user) => dispatch(setCurrentUser(user)));
//   };
// };
//
export const setCurrentUser= (user) => {
  return {
      type: actionTypes.SET_CURRENT_USER,
      user: user
  };
};



export const checkUserStatus = () => {
    return dispatch => {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            dispatch(authSuccess(user));
          } else {
            dispatch(authFail());
          }
        })
    };
};
