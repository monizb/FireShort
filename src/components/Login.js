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

import { loginUser } from "../actions";
import LoginLeftComponent from "./LoginLeftComponent";

const styles = () => ({
  "@global": { body: { background: `beige`, padding: 0, margin: 0 } },
  mainContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: { width: "60vw", overflow: "hidden", borderRadius: "20px" },
  loginRightPart: {
    width: "50%",
    height: "initial",
    padding: "50px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    overflow: "hidden",
  },
  logoTextContainer: {
    textAlign: "center",
  },
  logoTextImage: {
    height: "50px",
  },
  loginText: {
    textAlign: "center",
  },
  avatar: { width: "64px", height: "64px" },
  form: {
    width: "initial",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: "0px",
  },
  errorText: { color: "#f50057", marginBottom: 5, textAlign: "center" },
  submit: { fontSize: "1.2rem" },
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
        <Container className={classes.mainContainer}>
          <Paper className={classes.paper} elevation={24}>
            <Grid container alignItems="stretch" direction="row">
              <LoginLeftComponent />
              <Grid item className={classes.loginRightPart}>
                <div className={classes.logoTextContainer}>
                  <img
                    className={classes.logoTextImage}
                    src="./images/fireshortLogoText.gif"
                    alt="Fireshort Text Logo"
                  />
                </div>
                <Typography
                  className={classes.loginText}
                  component="h1"
                  variant="h5"
                >
                  Login
                </Typography>
                <form onSubmit={this.handleSubmit} className={classes.form}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    onChange={this.handleEmailChange}
                  />
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handlePasswordChange}
                  />
                  {loginError && (
                    <Typography component="p" className={classes.errorText}>
                      Incorrect email or password.
                    </Typography>
                  )}
                <br />
                  <Button
                    type="submit"
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
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
                  </Button>
              <br/>
              <br/>
              <Link to="/signup" style={{textDecoration: "none"}}>
                <Button
                  type="button"
                  fullWidth
                  size="large"
                  variant="outlined"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </Link>
            </form>
            <div style={{padding: "0.5rem", widht: "100%", textAlign:"center"}}>
                <Link to="/forgot-password">
                  <Typography component="p">
                    Forgot Password?
                  </Typography>
                </Link>
            </div>
              </Grid>
            </Grid>
          </Paper>
        </Container>
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
