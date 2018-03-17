import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    user: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
};

const authStart = ( state, action ) => {
    return updateObject( state, { error: null, loading: true } );
};

const authSuccess = (state, action) => {
    return updateObject( state, {
        user: action.user,
        error: null,
        loading: false
     } );
};

// const setCurrentUser = (state, action) => {
//     return updateObject( state, {
//         currentUser: action.user,
//      } );
// };

const authFail = (state, action) => {
    return updateObject( state, {
        error: action.error,
        loading: false,
        user: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { user: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
};

// const setCurrentUser = (state, action) => {
//     console.log(action);
//     return (
//       updateObject(state, { currentUser: action.user })
//     );
// };

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT_SUCCESS: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state,action);
        // case actionTypes.SET_CURRENT_USER: return setCurrentUser(state,action);
        default:
            return state;
    }
};

export default reducer;
