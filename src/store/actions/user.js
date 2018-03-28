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

export const authSuccessGame = (user, gameId) => {
    return {
        type: actionTypes.AUTH_SUCCESS_GAME,
        loading: false,
        user: user,
        isGaming: true,
        gameId: gameId
    };
};


export const authFail = () => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: true
    };
};

export const logout = () => {
  // console.log('authlogout');
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
          .then(user => {
              // console.log(user.uid);
              firebase.database().ref('users/' + user.uid ).once('value')
                .then(
                  (snapshot) => {
                  firebase.database().ref('users/' + user.uid).update({ signin: snapshot.val().signin + 1, provider: 'email'})
                  firebase.database().ref('users/' + user.uid ).once('value')
                  .then(snapshot =>
                    dispatch(authSuccess(snapshot.val()))
                  )
                })
          })


          .then((user) => dispatch(authSuccess(user)))
          .catch(() => {
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(
                user => {
                  firebase.database().ref('users/' + user.uid).set({
                    name: "Player-" + user.uid.slice(0, 5),
                    id: user.uid,
                    image: '',
                    signin: 1,
                    isGaming: false,
                    gameId: '',
                    provider: 'email'
                  });
                  firebase.database().ref('users/' + user.uid ).once('value')
                  .then(snapshot =>
                    dispatch(authSuccess(snapshot.val()))
                  )
                }
              )
          });
    };
};


export const authViaTwitter = () => {
  return dispatch => {
    dispatch(authStart());
    const provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then((data) =>
      {
        firebase.database().ref('users/' + data.user.uid ).once('value')
          .then( snapshot => {
            // console.log(snapshot)
            if(snapshot.val() === null){
              const uid = data.user.uid
              firebase.database().ref('users/' + uid).set({
                name: data.user.displayName,
                image: '',
                signin: 1,
                gameId: '',
                isGaming: false,
                provider: 'twitter'
              })
            }else{
              dispatch(authSuccess(snapshot.val()))
              firebase.database().ref('users/' + data.user.uid).update({ signin: snapshot.val().signin + 1, provider: 'twitter'})
            }
          })
      })
      // .then(dispatch(checkUserStatus()))
      .catch(() => dispatch(authFail()));
  };
};

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    };
};

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
            firebase.database().ref('users/' + user.uid ).once('value')
              .then(
                (snapshot) =>{
                  if(snapshot.val() === null){
                    firebase.database().ref('users/' + user.uid).set({
                      name: "Player-" + user.uid.slice(0, 5),
                      id: user.uid,
                      image: '',
                      signin: 2,
                      isGaming: false,
                      gameId: '',
                      provider: 'unknown'
                    }).then(
                      firebase.database().ref('users/' + user.uid ).once('value')
                      .then(
                        (snapshot) =>{
                          dispatch(authSuccess(snapshot.val()))
                        }
                      )
                    )
                  }else{
                    dispatch(authSuccess(snapshot.val()))
                  }
                }
              )
          } else {
            dispatch(authFail());
          }
        })
    };
};

// export const checkUserStatus = () => {
//     return dispatch => {
//         firebase.auth().onAuthStateChanged((user) => {
//           if (user) {
//             firebase.database().ref('users/' + user.uid ).once('value')
//               .then(
//                 (snapshot) => {
//                 const isGaming = snapshot.val().isGaming
//                 const gameId = snapshot.val().gameId
//                 console.log('im there');
//                 if(isGaming){
//                   dispatch(authSuccessGame(user,gameId));
//                 }
//                 else{
//                   dispatch(authSuccess(user));
//                 }
//               })
//           } else {
//             dispatch(authFail());
//           }
//         })
//     };
// };

// export const exitGame = () => {
//   // console.log('authlogout');
//   return dispatch => {
//       const user = firebase.auth().currentUser;
//       if(user.uid === user.gameId){
//         firebase.database().ref('/games/' + user.uid + '/info/').update({leader: 'inactive'})
//       }
//       firebase.database().ref('/users/' + user.uid).update({gameId: '', isGaming: false})
//       .then( dispatch(exitGameSuccess()));
//   };
// };

// export const exitGameSuccess = (game, user) => {
//   return {
//     type: actionTypes.USER_GAME_EXIT_SUCCESS
//   }
// }



export const uploadImage = (file) => {
  return dispatch => {
        dispatch(updateStart());
        const user = firebase.auth().currentUser;
        const storageRef = firebase.storage().ref();
        // Create a reference to 'images/mountains.jpg'
        const imageRef = storageRef.child('userImages/' + user.uid + '.jpg');
        imageRef.put(file).then(function(snapshot) {
          firebase.database().ref('users/' + user.uid ).update({
            image: snapshot.downloadURL
          })
          .then(dispatch(getUpdatedValue()))
        })
  };
};

export const updateName = (name) => {
  const user = firebase.auth().currentUser;
  return dispatch => {
      dispatch(updateStart());
      firebase.database().ref('users/' + user.uid ).update(
        {name: name}
      )
      .then(
        dispatch(getUpdatedValue())
      )
  };
};

export const getUpdatedValue = () => {
  const user = firebase.auth().currentUser;
  return dispatch => {
  firebase.database().ref('users/' + user.uid ).once('value')
  .then(snapshot =>
    dispatch(updateSuccess(snapshot))
  )}
}

export const updateStart = () => {
  return {
      type: actionTypes.USER_UPDATE_START
  };
};

export const updateSuccess = (snapshot) => {
  return {
      type: actionTypes.USER_UPDATE_SUCCESS,
      user: snapshot.val()
  };
};
