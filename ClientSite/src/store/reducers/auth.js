import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    token: null,
    userId: null,
    userIfno: null,
    isAdmin: null,
    error: null,
    loading: false,
    authRedirectPath: '/',
    activateEmail: false,
    verifiedEmail: false,
    emailVerificationStatus: null
};

const authStart = (state, action) => {
    return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
    return updateObject(state, {
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
        isAdmin: action.isAdmin
    });
};

const authFail = (state, action) => {
    // console.log(action.error);
    return updateObject(state, {
        error: action.error,
        loading: false
    });
};

const authLogout = (state, action) => {
    return updateObject(state, { 
        token: null, 
        userId: null, 
        isAdmin: false, 
        activateEmail: false,
        verifiedEmail: false,
        emailVerificationStatus: null });
};

const setAuthRedirectPath = (state, action) => {
    return updateObject(state, { authRedirectPath: action.path })
}

const redirectToActivateEmail = (state, action) => {
    return updateObject(state, {
        activateEmail: true,
        error: null,
        loading: false
    })
}

const returnSignup = (state, action) => {
    return updateObject(state, { activateEmail: false })
}

const returnLogin = (state, action) => {
    return updateObject(state, { verifiedEmail: false })
}

const emailVarification = (state, action) => {
    if(action.status){
        return updateObject(state, { emailVerificationStatus: true, loading: false,  verifiedEmail: true, error: null});
    }else{
        return updateObject(state, { emailVerificationStatus: false, loading: false, verifiedEmail: true, error: null});
    }
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH: return setAuthRedirectPath(state, action);
        case actionTypes.SIGNUP_SUCCESS: return redirectToActivateEmail(state, action);
        case actionTypes.RETURN_SIGNUP: return returnSignup(state, action);
        case actionTypes.RETURN_LOGIN: return returnLogin(state, action);
        case actionTypes.EMAIL_VERIFICATION: return emailVarification(state, action);
        default:
            return state;
    }
};

export default reducer;