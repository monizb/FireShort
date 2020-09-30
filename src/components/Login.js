import Avatar from "@material-ui/core/Avatar";
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
import EmailIcon from "@material-ui/icons/Email";
import LockIcon from "@material-ui/icons/Lock";
import Grid from "@material-ui/core/Grid";

import { loginUser } from "../actions";

const styles = () => ({
  "@global": { body: { backgroundColor: "#fff" } },
  paper: {
    marginTop: 80,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  top: {
    marginTop: 10,
  },
  maintext: {
    fontFamily: "Pacifico",
    fontSize: "45px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  margin: {
    margin: theme.spacing(3),
  },
  avatar1: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  avatar2: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  form: { marginTop: 1 },
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
        <Container component="main" maxWidth="xs">
          <div className={classes.top}>
            <Avatar className={classes.avatar1} src="/favicon.ico"></Avatar>
            <div className={classes.maintext}>FireShort</div>
          </div>
          <Paper className={classes.paper} elevation={3}>
            <Avatar
              className={classes.avatar2}
              src="/icons/hacker.svg"
            ></Avatar>
            <form onSubmit={this.handleSubmit}>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <EmailIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="email"
                      fullWidth
                      label="Email Address"
                      onChange={this.handleEmailChange}
                    />
                  </Grid>
                </Grid>
              </div>
              <div className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end">
                  <Grid item>
                    <LockIcon />
                  </Grid>
                  <Grid item>
                    <TextField
                      id="password"
                      fullWidth
                      label="Password"
                      onChange={this.handlePasswordChange}
                    />
                  </Grid>
                </Grid>
              </div>
              {loginError && (
                <Typography component="p" className={classes.errorText}>
                  Incorrect email or password.
                </Typography>
              )}
              <br></br>
              <Button
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                <MuiThemeProvider theme={theme}>
                  {isLoading ? (
                    <CircularProgress color="secondary" />
                  ) : (
                    "Sign In"
                  )}
                </MuiThemeProvider>
              </Button>
            </form>
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
