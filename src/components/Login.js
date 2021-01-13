import { Grid } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import EmailIcon from '@material-ui/icons/Email';
import { loginUser } from "../actions";
import "./login.css";
import LockIcon from '@material-ui/icons/Lock';
import LoginLeftComponent from "./LoginLeftComponent";

const styles=()=>({

errorText: { color: "#f50057", marginBottom: 5, textAlign: "center" },

});
const theme = createMuiTheme({ palette: { secondary: { main: "#fff" } } });

class Login extends Component {
  state = { email: "", password: "" };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { classes, loginError, isAuthenticated, isLoading } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/admin" />;
    } else {
      return (
        <div className="Container">
           <div className="contain-paper">
               <div className="signin-signup">                 
                  <form action="" className="sign-in-form">                   
                    <br></br>
                    <h2 className={classes.title}>LOGIN</h2>
                    <br></br>
                   <form onSubmit={this.handleSubmit} className={classes.form}>
                    <div className="input-field">
                       <i><EmailIcon/></i>
                       <input type="email" name="email" id="email" placeholder="Email Address"
                        variant="outlined"
                        onChange={this.handleEmailChange}/>
                    </div>
                    <div className="input-field">
                       <i><LockIcon/></i>
                       <input type="password" name="password" id="password" placeholder="Password"
                        variant="outlined"
                        onChange={this.handlePasswordChange}/>
                      </div>
                    {loginError && (
                    <Typography component="p" className={classes.errorText}>
                      Incorrect email or password.
                    </Typography>
                     )}
                    <br/>
                    <button
                    type="submit"
                    className="submit"
                    >
                    <MuiThemeProvider theme={theme}>
                      {isLoading && !loginError ? (
                        <CircularProgress
                          className={classes.loader}
                          color="secondary"
                        />
                      ) : (
                          "Sign In"
                        )}
                    </MuiThemeProvider>
                    </button>
                     <br/>
                    <Link to="/signup" style={{textDecoration: "none"}}>
                      <button
                       type="button"
                       className="submit"
                      >
                         Sign Up
                      </button>
                    </Link> 
                   </form>
                    <br/>
                    <div style={{padding: "0.5rem", widht: "100%", textAlign:"center",textDecoration:"none"}}>
                       <Link to="/forgot-password">
                         <Typography component="p">
                             Forgot Password?
                          </Typography>
                        </Link>
                    </div>
                  </form>
                </div>
              <div className="panel-container">
                 <div className="panel left-panel">
                    <h1>Fireshort</h1>
                    <LoginLeftComponent/>
                   
                 </div>
              </div>
           </div>
           
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    isLoggingIn: state.auth.isLoggingIn,
    isLoading: state.auth.isLoading,
    loginError: state.auth.loginError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Login));
