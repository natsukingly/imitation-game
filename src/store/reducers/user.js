import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    id: null,
    name: null,
    image: null,
    isGaming: null,
    isAuthenticated: null,
    gameId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        id: action.user.id,
        name: action.user.name,
        image: action.user.image,
        isGaming: action.user.isGaming,
        gameId: action.user.gameId,
        isAuthenticated: true,
        error: null,
        loading: false
     } );
};

// const authSuccessGame = (state, action) => {
//     return updateObject( state, {
//         id: action.user.uid,
//         gameId: action.user.gameId,
//         isGaming: true,
//         isAuthenticated: true,
//         error: null,
//         loading: false,
//      } );
// };

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        id: false,
        isAuthenticated: false,
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { id: null, name: null, image: null, isAuthenticated: false, });
};

// const gameExitSuccess = (state, action) => {
//     return updateObject(state, { gameId: null, isGaming: false});
// };

// const setAuthRedirectPath = (state, action) => {
//     return updateObject(state, { authRedirectPath: action.path })
// };

const updateStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const updateSuccess = (state, action) => {
    console.log('from reducer');
    return updateObject( state, {
        name: action.user.name,
        image: action.user.image,
        error: null,
        loading: false
    } );
};

const updateFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        user: false
    });
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        // case actionTypes.AUTH_SUCCESS_GAME: return authSuccessGame(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT_SUCCESS: return authLogout(state, action);
        // case actionTypes.USER_GAME_EXIT_SUCCESS: return gameExitSuccess(state, action);
        case actionTypes.USER_UPDATE_START: return updateStart(state, action);
        case actionTypes.USER_UPDATE_SUCCESS: return updateSuccess(state, action);
        case actionTypes.USER_UPDATE_FAIL: return updateFail(state, action);
        // case actionTypes.SET_CURRENT_USER: return setCurrentUser(state,action);
        default:
            return state;
    }
};

export default reducer;
