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
import { Redirect } from "react-router-dom";

import { loginUser } from "../actions";
import LoginRightComponent from "./LoginRightComponent";

const styles = () => ({
  "@global": {
    body: {
      background: `white`,
      padding: 0,
      margin: 0,
      backgroundImage: `url(./Images/background.png)`,
      backgroundSize: "cover",
    },
  },
  mainContainer: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  paper: { width: "60vw", overflow: "hidden", borderRadius: "20px" },
  loginLeftPart: {
    width: "40%",
    height: "initial",
    padding: "50px 50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "stretch",
    overflow: "hidden",
  },
  logoTextContainer: {
    textAlign: "flex-start",
  },
  logoTextImage: {
    height: "50px",
  },
  loginText: {
    fontSize: "3rem",
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
  submit: { fontSize: "1.2rem", backgroundColor: "black" },
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
              <Grid item className={classes.loginLeftPart}>
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
                </form>
              </Grid>
              <LoginRightComponent />
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
