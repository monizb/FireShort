import { myFirebase } from "../firebase/firebase";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const SIGN_UP_REQUEST = "SIGN_UP_REQUEST";
export const SIGN_UP_SUCCESS = "SIGN_UP_SUCCESS";
export const SIGN_UP_FAILURE = "SIGN_UP_FAILURE";

export const RESEND_CONFIRMATION_EMAIL = "RESEND_CONFIRMATION_EMAIL";
export const RESEND_CONFIRMATION_EMAIL_SUCCESS = "RESEND_CONFIRMATION_ENAIL_SUCCESS";
export const RESEND_CONFIRMATION_EMAIL_FAILURE = "RESEND_CONFIRMATION_EMAIL_FAILURE";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAILURE = "LOGOUT_FAILURE";

export const VERIFY_REQUEST = "VERIFY_REQUEST";
export const VERIFY_SUCCESS = "VERIFY_SUCCESS";

export const SEND_PASS_RESET = "SEND_PASS_RESET";
export const SEND_PASS_RESET_ERROR = "SEND_PASS_RESET_ERROR";
export const SEND_PASS_RESET_SUCCESS = "SEND_PASS_RESET_SUCCESS";

const requestLogin = () => {
  return {
    type: LOGIN_REQUEST
  };
};

const receiveLogin = user => {
  return {
    type: LOGIN_SUCCESS,
    user
  };
};

const loginError = () => {
  return {
    type: LOGIN_FAILURE
  };
};

const requestsignup = () => {
  return {
    type: SIGN_UP_REQUEST
  };
};

const receiveSignup = user => {
  return {
    type: SIGN_UP_SUCCESS,
    user
  };
};

const signupError = (errMess) => {
  return {
    type: SIGN_UP_FAILURE,
    errMess
  };
};

const requestLogout = () => {
  return {
    type: LOGOUT_REQUEST
  };
};

const receiveLogout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

const logoutError = () => {
  return {
    type: LOGOUT_FAILURE
  };
};

const verifyRequest = () => {
  return {
    type: VERIFY_REQUEST
  };
};

const verifySuccess = () => {
  return {
    type: VERIFY_SUCCESS
  };
};

const resendCE = () => {
  return {
    type: RESEND_CONFIRMATION_EMAIL
  };
}

const resendCESuccess = () => {
  return {
    type: RESEND_CONFIRMATION_EMAIL_SUCCESS
  }
};

const resendCEFailure = (errMess) => {
  return {
    type: RESEND_CONFIRMATION_EMAIL_FAILURE,
    errMess
  };
}

const sendingPassReset = () => {
  return {
    type: SEND_PASS_RESET
  };
};

const sendPassResetError = (errMess) => {
  return {
    type: SEND_PASS_RESET_ERROR,
    errMess
  };
};

const sendPassResetSuccess = () => {
  return {
    type: SEND_PASS_RESET_SUCCESS,
  };
};

export const loginUser = (email, password) => dispatch => {
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user => {
      dispatch(receiveLogin(user));
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(loginError());
    });
};

export const signupUser = (displayName, email, password, password2) => dispatch => {
  dispatch(requestsignup());
  //verifying password and name.
  if(displayName.length < 3){
    return dispatch(signupError("Name must have atleast 3 characters."));
  }

  if(displayName.length > 50){
    return dispatch(signupError("Name must have atmost 50 characters."));
  }

  if(!/^[a-zA-Z ]*$/.test(displayName)){
    return dispatch(signupError("Name must contain only alphabets."));
  }
  
  if(password !== password2){
    return dispatch(signupError("Passwords do not match"));
  }

  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then(user => {
      user.user.updateProfile({displayName})
      .then(()=>{
        user.user.sendEmailVerification()
        .then(()=>{
          dispatch(receiveSignup(user.user));
        })
        .catch(error=>{
          dispatch(resendCEFailure("An error occurred while sending verification email."));
          dispatch(receiveSignup(user.user));
        })
      })
    })
    .catch(error => {
      //Do something with the error if you want!
      switch(error.code){
        case 'auth/email-already-in-use': 
          dispatch(signupError("A user already exist with the given email address."));
          break;
        case 'auth/weak-password':
          dispatch(signupError("The password is too weak."));
          break;
        case 'auth/invalid-email':
          dispatch(signupError("Invalid email address."));
          break;
        default:
          dispatch(signupError("An unknown error occurred while signing up."));
      }
    });
};

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() => {
      dispatch(receiveLogout());
    })
    .catch(error => {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch => {
  dispatch(verifyRequest());
  myFirebase.auth().onAuthStateChanged(user => {
    if (user !== null) {
      dispatch(receiveLogin(user));
    }
    dispatch(verifySuccess());
  });
};

export const resendConfirmationEmail = () => dispatch => {
  dispatch(resendCE());
  if(myFirebase.auth().currentUser){
    myFirebase.auth().currentUser.sendEmailVerification()
    .then(()=>{
      dispatch(resendCESuccess())
    })
    .catch(error =>{
      //Do something with the error if you want
      console.error(error);
      if(error.code === "auth/too-many-requests")
        dispatch(resendCEFailure("An error occurred while sending verification email."));
      else 
        dispatch(resendCEFailure("Too many request. Please wait for some time before you request again."));
    });
  }
} 

export const sendPasswordResetLink = (email) => dispatch => {
  dispatch(sendingPassReset());
  myFirebase.auth().sendPasswordResetEmail(email)
  .then(()=>{
    dispatch(sendPassResetSuccess());
  })
  .catch(error=>{
    console.error(error);
    switch(error.code){
      case 'auth/invalid-email':
        dispatch(sendPassResetError("Invalid email address."));
        break;
      case 'auth/user-not-found':
        dispatch(sendPassResetError("User not found with the given email address."));
        break;
      default:
        dispatch(sendPassResetError("Failed to send password reset email."));
    }
  })
}