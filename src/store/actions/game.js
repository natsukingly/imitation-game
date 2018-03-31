import firebase from 'firebase';
import * as actionTypes from './actionTypes';



export const checkGameStatus = () => {

  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId )
        .on('value', snapshot =>
          {
            if(snapshot.val() === null){
            } else{
              dispatch(checkGameStatusSuccess(snapshot.val()))
            }
          }
        )
      }
    )
  };
}

export const checkUserGamingStatus = () => {

  return dispatch => {
    firebase.auth().onAuthStateChanged((user) => {
      if(user){
      const cuid = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
          {
            if(snapshot.val() !== null){
              const isGaming = snapshot.val().isGaming
              dispatch(checkUserGamingStatusSuccess(isGaming))
            }
          }
        )
      }
    })
  }
}

export const checkUserGamingStatusSuccess = (isGaming) => {
  return{
    type: actionTypes.GAME_CHECK_USER_GAMING_STATUS_SUCCESS,
    userIsGaming: isGaming
  };
}

export const checkPlayerStatus = () => {

  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;

    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const currentUser = snapshot.val()
        const userIsGaming = currentUser.isGaming
        if(userIsGaming){
          const gameId = currentUser.gameId
          firebase.database().ref('/games/' + gameId + '/players/' + cuid ).once('value').then(playerSnapshot =>
            {
              if(playerSnapshot.val() !== null){
                const playerStatus = playerSnapshot.val().ready
                dispatch(checkPlayerStatusSuccess(playerStatus, userIsGaming))
              } else {
              }
            }
          )
        }
      }
    )
  };
}

export const checkPlayerStatusSuccess = (playerStatus) => {
  return{
    type: actionTypes.GAME_CHECK_PLAYER_STATUS_SUCCESS,
    playerStatus: playerStatus,
    userIsGaming: true
  };
}


export const startGame = (status) => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId;
        firebase.database().ref('/games/' + gameId + '/info' ).update({status: 'question'})
        .then(
          dispatch(startGameSuccess())
        )
      }
    )

  }
}

export const joinGame = (gameId) => {
  // console.log(gameId)
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const currentUser = snapshot.val();
        const gameEx = snapshot.val().gameEx + 1
        firebase.database().ref('/users/' + cuid ).update({isGaming: true, gameId: gameId, gameEx: gameEx})
        firebase.database().ref('/games/' + gameId + '/players/' + cuid ).set({image: currentUser.image, leader: false, name: currentUser.name, ready: false, active: true})
        firebase.database().ref('/games/' + gameId + '/input/' + cuid ).set({input: ''})
        firebase.database().ref('/games/' + gameId + '/output/' + cuid ).set({output: ''})
        firebase.database().ref('/games/' + gameId + '/score/' + cuid ).set({score: 0, lastScore: 0, uid: cuid})
        .then(
          dispatch(joinGameSuccess())
        )
      }
    )
  }
}

export const joinGameWithForce = (nextGameId) => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const currentUser = snapshot.val();
        const currentGameId = snapshot.val().gameId;
        const gameEx = snapshot.val().gameEx + 1;
        firebase.database().ref('/games/' + currentGameId + '/players/' + cuid).update({active: false})

        firebase.database().ref('/users/' + cuid ).update({isGaming: true, gameId: nextGameId, gameEx: gameEx})
        firebase.database().ref('/games/' + nextGameId + '/players/' + cuid ).set({image: currentUser.image, leader: false, name: currentUser.name, ready: false})
        firebase.database().ref('/games/' + nextGameId + '/input/' + cuid ).set({input: ''})
        firebase.database().ref('/games/' + nextGameId + '/output/' + cuid ).set({output: ''})
        firebase.database().ref('/games/' + nextGameId + '/score/' + cuid ).set({score: 0, lastScore: 0, uid: cuid})
        .then(
          dispatch(joinGameSuccess())
        )
      }
    )
  }
}

export const joinGameSuccess = () => {
  return{
    type: actionTypes.GAME_JOIN_SUCCESS,
  };
}



export const moveForward = (nextStage) => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId ).once('value').then(gameSnapshot =>
          {
            const players = gameSnapshot.val().players;
            Object.keys(players).map( (playerId) =>
              firebase.database().ref('/games/' + gameId + '/players/' + playerId ).update({ready: false})
            )
          }
        )
        .then(
          firebase.database().ref('/games/' + gameId + '/info' ).update({status: nextStage})
        )
        .then(
          dispatch(moveForwardSuccess(nextStage))
        )
      }
    )
  }
}

export const moveForwardSuccess = (nextStage) => {
  return{
    type: actionTypes.GAME_MOVE_FORWARD_SUCCESS,
    action: nextStage
  };
}

export const moveToNextQuestion = () => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId ).once('value').then(gameSnapshot =>
          {
            const players = gameSnapshot.val().players;
            const currentStage = gameSnapshot.val().info.stage;
            firebase.database().ref('/games/' + gameId + '/info' ).update({status: 'question', stage: currentStage + 1})
            .then(
              Object.keys(players).map( (playerId) =>
                {
                firebase.database().ref('/games/' + gameId + '/players/' + playerId ).update({ready: false})
                firebase.database().ref('/games/' + gameId + '/input/' + playerId ).update({input: ''})
                firebase.database().ref('/games/' + gameId + '/output/' + playerId ).update({output: ''})
                return false;
                }
            )


            // {
            //   firebase.database().ref('/games/' + gameId + '/players/' + playerId ).update({ready: false})
            //   firebase.database().ref('/games/' + gameId + '/input/' + playerId ).update({input: ''})
            //   firebase.database().ref('/games/' + gameId + '/output/' + playerId ).update({output: ''})
            // }


            )
            .then(
              dispatch(moveToNextQuestionSuccess())
            )
          }
        )
      }
    )
  }
}

export const moveToNextQuestionSuccess = () => {
  return{
    type: actionTypes.GAME_MOVE_TO_NEXT_QUESTION_SUCCESS,
  };
}

export const moveToFinalResult = () => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId;
        firebase.database().ref('/games/' + gameId + '/info' ).update({status: 'finalResult'})

        .then(
          dispatch(moveForwardSuccess('finalResult'))
        )
      }
    )
  }
}

export const moveToLastStageSuccess = () => {
  return{
    type: actionTypes.GAME_MOVE_TO_LAST_STAGE_SUCCESS,
  };
}





export const startGameSuccess = () => {
  return{
    type: actionTypes.GAME_START_SUCCESS,
  };
}

export const getGameInfo = (gameId) => {
  return dispatch => {
    firebase.database().ref('/games/' + gameId ).once('value').then(gameSnapshot =>
      {
      const gameInfo = gameSnapshot.val();
      return(
        dispatch(getGameInfoSuccess(gameInfo))
        )
      }
    )
  }
}

export const getGameInfoSuccess = (gameInfo) => {
  return{
    type: actionTypes.GAME_GET_INFO_SUCCESS,
    gameInfo: gameInfo,
  };
}

export const exitGame = () => {

  return dispatch => {
      const cuid = firebase.auth().currentUser.uid;

      firebase.database().ref('/users/' + cuid).once('value').then(
        snapshot =>
        {
        const user = snapshot.val()
        firebase.database().ref('/games/' + user.gameId ).off()
        firebase.database().ref('/games/' + user.gameId + '/players/' + cuid).update({active: false})
        if(user.leader === true){
          firebase.database().ref('/games/' + user.gameId + '/info').once('value').then(

            gameSnapshot =>
              {
                // console.log(gameSnapshot.val())
                // console.log(gameSnapshot.val().status)
                if(gameSnapshot.val().status !== 'finalResult'){
                  firebase.database().ref('/games/' + user.gameId + '/info').update({leader: false, status: 'noLeader'})
                }
              }
          )
        }
        firebase.database().ref('/users/' + cuid).update({gameId: '', isGaming: false, leader: false})
        .then( dispatch(exitGameSuccess()));

      }


    )
  };
};

export const exitGameSuccess = (game, user) => {
  return {
    type: actionTypes.GAME_EXIT_SUCCESS
  }
}

export const setQuestion = () => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId ).once('value').then(gameSnapshot =>
          {
            const stage = gameSnapshot.val().info.stage;
            const questionList = gameSnapshot.val().info.questions;
            const selectedQuestion = questionList[stage];
            firebase.database().ref('/games/' + gameId + '/info').update({currentQuestion: questionList[stage]})
            .then(
              firebase.database().ref('/decks/imitationGame/' + selectedQuestion ).once('value').then( questionSnapshot => {
                dispatch(setQuestionSuccess(questionSnapshot))
              })
            )
          }
        )
      }
    )
  }
}

export const setPresetOptions = () => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId ).once('value').then(gameSnapshot =>
          {
            const targetQuestion = gameSnapshot.val().info.currentQuestion;
            firebase.database().ref('/decks/imitationGame/' + targetQuestion ).once('value').then( questionSnapshot => {
              dispatch(setPresetOptionsSuccess(questionSnapshot.val().answer, questionSnapshot.val().fake))
            })
          }
        )
      }
    )
  }
}

export const setPresetOptionsSuccess = (answer, fake) => {
  return{
    type: actionTypes.GAME_SET_PRESET_OPTIONS_SUCCESS,
    answer: answer,
    fake: fake,
  };
}

export const selectOption = (optionId) => {
  return dispatch => {

    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId + '/output/' + cuid)
        .update({output: optionId})
        .then(() => {
            switch(optionId){
              case "correct":
                firebase.database().ref('/games/' + gameId + '/score/' + cuid)
                .once('value').then( scoreSnapshot =>
                  {
                    const currentScore = scoreSnapshot.val().score;
                    firebase.database().ref('/games/' + gameId + '/score/' + cuid)
                    .update({score: currentScore + 1, lastScore: currentScore});
                  }
                )
                break;
              case "dummy":
                firebase.database().ref('/games/' + gameId + '/score/' + cuid)
                .once('value').then( scoreSnapshot =>
                  {
                    const currentScore = scoreSnapshot.val().score;
                    firebase.database().ref('/games/' + gameId + '/score/' + cuid)
                    .update({score: currentScore - 1, lastScore: currentScore});
                  }
                )
                break;
              case cuid:
                firebase.database().ref('/games/' + gameId + '/score/' + cuid)
                  .once('value').then( scoreSnapshot =>
                    {
                      const currentScore = scoreSnapshot.val().score;
                      firebase.database().ref('/games/' + gameId + '/score/' + cuid)
                      .update({score: currentScore - 3, lastScore: currentScore});
                    }
                  )
                  break;
              default:
                firebase.database().ref('/games/' + gameId + '/score/' + optionId)
                .once('value').then( scoreSnapshot =>
                  {
                    const currentScore = scoreSnapshot.val().score;
                    firebase.database().ref('/games/' + gameId + '/score/' + optionId)
                    .update({score: currentScore + 3, lastScore: currentScore});
                  }
                )
            }
          }
        )
        .then(
          firebase.database().ref('/games/' + gameId + '/players/' + cuid)
          .update({ready: true})
        )
        .then(
          dispatch(playerIsReady())
        )
      }
    )
  }
}


export const setQuestionSuccess = (questionSnapshot) => {
  return{
    type: actionTypes.GAME_SET_QUESTION_SUCCESS,
    question: questionSnapshot.val().question
  };
}

export const submitInput = (input) => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
        firebase.database().ref('/games/' + gameId + '/input/' + cuid)
        .update({input})
        .then(
          firebase.database().ref('/games/' + gameId + '/players/' + cuid)
          .update({ready: true})
        )
        .then(
          dispatch(submitInputSuccess())
        )
      }
    )
  }
}

export const submitInputSuccess = () => {
  return{
    type: actionTypes.GAME_INPUT_SUBMIT_SUCCESS,
  };
}

export const setPlayerReady = () => {
  return dispatch => {
    const cuid = firebase.auth().currentUser.uid;
    firebase.database().ref('/users/' + cuid ).once('value').then( snapshot =>
      {
        const gameId = snapshot.val().gameId
          firebase.database().ref('/games/' + gameId + '/players/' + cuid)
          .update({ready: true})
        .then(
          dispatch(playerIsReady())
        )
      }
    )
  }
}

export const playerIsReady = () => {
  return{
    type: actionTypes.GAME_PLAYER_IS_READY,
  };
}

export const checkGameStatusSuccess = (game, leader) => {

  return{
    type: actionTypes.GAME_CHECK_STATUS_SUCCESS,
    info: game,
    status: game.info.status,
    leader: leader
  };
}

export const createGameStart = () => {
  return{
    type: actionTypes.GAME_CREATE
  };
};

export const createGame = (round) => {
  return dispatch => {
    dispatch(createGameStart())
    const uid = firebase.auth().currentUser.uid;
    firebase.database().ref('users/' + uid ).once('value')
    .then( snapshot =>
      {
        const user = snapshot.val();
        const gameEx = user.gameEx + 1
        const gameId = uid + gameEx
        // array creation
        const totalQuestions = 3
        const indexArray = Array.from(Array(totalQuestions).keys())

        // array shuffle code
        function shuffleAry(ary) {
          var i = ary.length;
          while(i){
            var j = Math.floor(Math.random()*i);
            var t = ary[--i];
            ary[i] = ary[j];
            ary[j] = t;
          }
          return ary;
        }
        // array shuffle code
        const questions = shuffleAry(indexArray).slice(0, round)

          var d = new Date();
          var year  = d.getFullYear();
          var month = d.getMonth() + 1;
          var day   = d.getDate();
          var hour  = ( d.getHours()   < 10 ) ? '0' + d.getHours()   : d.getHours();
          var min   = ( d.getMinutes() < 10 ) ? '0' + d.getMinutes() : d.getMinutes();
          var sec   = ( d.getSeconds() < 10 ) ? '0' + d.getSeconds() : d.getSeconds();
          var GameCreatedAt = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + sec ;


          var gameData = {
            gameId: gameId,
            length: round,
            questions: questions,
            currentQuestion: '',
            games: '',
            deck: 'imitationGame',
            member: 1,
            stage: 0,
            status: 'init',
            leader: uid,
            createdAt: GameCreatedAt
          }

          var playerData = {
              name: user.name,
              image: user.image,
              ready: false,
              leader: true,
              active: true
          }


          // setData['/players/' + user.uid] = playerData;
          firebase.database().ref('/games/' + gameId ).set('')
          firebase.database().ref('/games/' + gameId + '/info').set(gameData)
          .then(
          firebase.database().ref('/games/' + gameId + '/players/' + uid).set(playerData))
          .then(
          firebase.database().ref('/games/' + gameId + '/input/' + uid).set({input: false}))
          .then(
          firebase.database().ref('/games/' + gameId + '/output/' + uid).set({output: false}))
          .then(
          firebase.database().ref('/games/' + gameId + '/score/' + uid).set({uid: uid, score: 0, lastScore: 0}))
          .then(
          firebase.database().ref('/users/' + uid).update({gameId: gameId, isGaming: true, gameEx: gameEx, leader: true}))
          .then(
            dispatch(createGameSuccess())
          )
            // firebase.database().ref('/decks/imitationGame').update({count: snapshot.val() + 1}))
          // .then(window.location.reload())
      }
    )
  }
};



export const createGameSuccess = () => {
  return {
    type: actionTypes.GAME_CREATE_SUCCESS,
  }
};
