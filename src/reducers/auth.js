import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  SIGN_UP_REQUEST,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  RESEND_CONFIRMATION_EMAIL_FAILURE,
  RESEND_CONFIRMATION_EMAIL_SUCCESS,
  RESEND_CONFIRMATION_EMAIL, SEND_PASS_RESET_SUCCESS, SEND_PASS_RESET, SEND_PASS_RESET_ERROR
} from "../actions/";

export default (
  state = {
    isLoggingIn: false,
    isSigningUp: false,
    isLoading: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    signupError: false,
    logoutError: false,
    isAuthenticated: false,
    resendsuccess: false,
    resendError: false,
    sendPassResetSuccess: false,
    sendPassResetError: false,
    user: {},
  },
  action
) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoading: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isAuthenticated: false,
        isLoading: false,
        loginError: true,
      };
    
    case SIGN_UP_REQUEST: 
      return {
        ...state,
        isSigningUp: true,
        isLoading: true,
        signupError: false,
      };
    
    case SIGN_UP_SUCCESS: 
      return {
        ...state,
        isSigningUp: false,
        isLoading: false,
        signupError: false,
        isAuthenticated: true,
        user: action.user
      };

    case SIGN_UP_FAILURE: 
      return {
        ...state,
        isSigningUp: false,
        isLoading: false,
        signupError: action.errMess
      };

    case RESEND_CONFIRMATION_EMAIL:
      return {
        ...state,
        isLoading: true,
        resendSuccess: false,
        resendError: false
      };
    
    case RESEND_CONFIRMATION_EMAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        resendSuccess: true,
        resendError: false
      };
    
    case RESEND_CONFIRMATION_EMAIL_FAILURE:
      return {
        ...state,
        isLoading: false,
        resendSuccess: false,
        resendError: action.errMess
      }
    case SEND_PASS_RESET:
      return {
        ...state,
        isLoading: true,
        sendPassResetSuccess: false,
        sendPassResetError: false
      };

    case SEND_PASS_RESET_SUCCESS:
      return {
        ...state,
        isLoading: false,
        sendPassResetSuccess: true,
        sendPassResetError: false
      };
      
    case SEND_PASS_RESET_ERROR:
      return {
        ...state,
        isLoading: false,
        sendPassResetSuccess: false,
        sendPassResetError: action.errMess
      };
    case LOGOUT_REQUEST:
      return { ...state, isLoggingOut: true, logoutError: false };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGOUT_FAILURE:
      return { ...state, isLoggingOut: false, logoutError: true };
    case VERIFY_REQUEST:
      return { ...state, isVerifying: true, verifyingError: false };
    case VERIFY_SUCCESS:
      return { ...state, isVerifying: false };
    default:
      return state;
  }
};
