import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    isGaming: null,
    error: null,
    loading: false,
    ready: null,
};


const gamePlayerIsReady = (state, action) => {
  return updateObject( state, {
      playerStatus: true
   } );
}

const gameStartSuccess = (state, action) => {
  return updateObject( state, {
      status: 'question'
   } );
}

const gameJoinSuccess = (state, action) => {
  return updateObject( state, {
      loading: false,
      userIsGaming: true
   } );
}

const gameGetInfoSuccess = (state, action) => {
  return updateObject( state, {
      invitationInfo: action.gameInfo
   } );
}

const gameHasAnimated = (state, action) => {
  return updateObject( state, {
      willAnimate: false
   } );
}

const gameWillAnimate = (state, action) => {
  return updateObject( state, {
      willAnimate: true
   } );
}


// const gameGetPlayerRanking = (state, action) => {
//   return updateObject( state, {
//       ranking: action.ranking
//    } );
// }



const gameSetQuestionSuccess = (state, action) => {
    // console.log(action)
    return updateObject( state, {
        question: action.question,
        judge: action.judge,
        target: action.target
     } );
};

const gameSetPresetOptionsSuccess = (state, action) => {
    return updateObject( state, {
        correctAnswer: action.answer,
        dummyAnswer: action.fake,
     } );
};

const gameCheckStatusSuccess = (state, action) => {
    // console.log(action)
    return updateObject( state, {
        id: action.info.info.gameId,
        info: action.info.info,
        leader: action.info.info.leader,
        players: action.info.players,
        input: action.info.input,
        output: action.info.output,
        score: action.info.score,
        status: action.info.info.status,
        stage: action.info.info.stage,
        newMessage: action.info.info.newMessage,
        messages: action.info.chat,
        gameType: action.info.info.gameType,
        time: action.info.info.stageChangedAt
     } );
};

const gameCheckPlayerStatusSuccess = (state, action) => {

    return updateObject( state, {
        playerStatus: action.playerStatus,
        userIsGaming: action.userIsGaming
     } );
};

const gameCheckUserGamingStatusSuccess = (state, action) => {

    return updateObject( state, {
        userIsGaming: action.userIsGaming
     } );
};

const gameCreate = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const gameCreateSuccess = (state, action) => {
    // console.log("success!")
    return updateObject( state, {
        loading: false,
        userIsGaming: true
     } );
};

const gameCreateFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        user: false
    });
};

const setGameRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
};

const gameInputSubmitSuccess = (state, action) => {
  return updateObject( state, {
      playerStatus: true,
  });
};

const gameMoveForwardSuccess = (state, action) => {
  return updateObject( state, {
      stage: action.nextStage,
      time: action.time,
      playerStatus: false,
      question: null,
      correctAnswer: null,
      dummyAnswer: null
  });
};

const gameSubmitMessageSuccess = (state, action) => {
  // console.log("submit success")
  return updateObject( state, {

  });
};

const gameSetMessagesSuccess = (state, action) => {
  // console.log("get messages success")
  return updateObject( state, {
      messages: action.messages
  });
};

const gameSetUMessagesSuccess = (state, action) => {
  // console.log("get uMessages success")
  return updateObject( state, {
      uMessages: action.uMessages
  });
};

const gameMoveToNextQuestionSuccess = (state, action) => {
  return updateObject( state, {
      stage: 'question',
      playerStatus: false
  });
};

const gameMoveToLastStageSuccess = (state, action) => {
  return updateObject( state, {
      stage: 'end',
  });
};

const gameExitSuccess = (state, action) => {
    return updateObject(state, { userIsGaming: false});
};


const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.GAME_CREATE: return gameCreate(state, action);
        case actionTypes.GAME_CREATE_SUCCESS: return gameCreateSuccess(state, action);
        case actionTypes.GAME_CREATE_FAIL: return gameCreateFail(state, action);
        case actionTypes.GAME_CHECK_STATUS_SUCCESS: return gameCheckStatusSuccess(state, action);
        case actionTypes.GAME_CHECK_PLAYER_STATUS_SUCCESS: return gameCheckPlayerStatusSuccess(state, action);
        case actionTypes.SET_GAME_REDIRECT_PATH: return setGameRedirectPath(state,action);
        // case actionTypes.SET_CURRENT_USER: return setCurrentUser(state,action);
        case actionTypes.GAME_START_SUCCESS: return gameStartSuccess(state, action);
        case actionTypes.GAME_JOIN_SUCCESS: return gameJoinSuccess(state, action);
        case actionTypes.GAME_EXIT_SUCCESS: return gameExitSuccess(state, action);
        case actionTypes.GAME_MOVE_FORWARD_SUCCESS: return gameMoveForwardSuccess(state, action);
        case actionTypes.GAME_MOVE_TO_LAST_STAGE_SUCCESS: return gameMoveToLastStageSuccess(state, action);
        case actionTypes.GAME_MOVE_TO_NEXT_QUESTION_SUCCESS: return gameMoveToNextQuestionSuccess(state, action);

        case actionTypes.GAME_SET_QUESTION_SUCCESS: return gameSetQuestionSuccess(state, action);
        case actionTypes.GAME_GET_INFO_SUCCESS: return gameGetInfoSuccess(state, action);
        case actionTypes.GAME_CHECK_USER_GAMING_STATUS_SUCCESS: return gameCheckUserGamingStatusSuccess(state, action);
        case actionTypes.GAME_SET_PRESET_OPTIONS_SUCCESS: return gameSetPresetOptionsSuccess(state, action);
        case actionTypes.GAME_INPUT_SUBMIT_SUCCESS: return gameInputSubmitSuccess(state, action);
        case actionTypes.GAME_SUBMIT_MESSAGE_SUCCESS: return gameSubmitMessageSuccess(state, action);
        case actionTypes.GAME_SET_MESSAGES_SUCCESS: return gameSetMessagesSuccess(state, action);
        case actionTypes.GAME_SET_UMESSAGES_SUCCESS: return gameSetUMessagesSuccess(state, action);
        case actionTypes.GAME_PLAYER_IS_READY: return gamePlayerIsReady(state, action);

        case actionTypes.GAME_HAS_ANIMATED: return gameHasAnimated(state, action);
        case actionTypes.GAME_WILL_ANIMATE: return gameWillAnimate(state, action);
        default:
            return state;
    }
};

export default reducer;
