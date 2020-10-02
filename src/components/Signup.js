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

import { signupUser } from "../actions";

const styles = () => ({
  "@global": { body: { backgroundColor: "#fff" } },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 20,
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
  },
  form: { marginTop: 1 },
  errorText: { color: "#f50057", marginBottom: 5, textAlign: "center" },
});

const theme = createMuiTheme({ palette: { secondary: { main: "#fff" } } });

class SignUp extends Component {
  state = { email: "", password: "", password2: "", displayName: "" };

  handleNameChange = ({ target }) => {
    this.setState({ displayName: target.value });
  };

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handlePasswordChange = ({ target }) => {
    this.setState({ password: target.value });
  };

  handlePasswordChange2 = ({ target }) => {
    this.setState({ password2: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { displayName, email, password, password2 } = this.state;

    dispatch(signupUser(displayName, email, password, password2));
  };

  render() {
    const { classes, signupError, isAuthenticated, isLoading } = this.props;
    if (isAuthenticated) {
      return <Redirect to="/admin" />;
    } else {
      return (
        <Container component="main" maxWidth="xs">
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} src="/favicon.ico"></Avatar>
            <Typography component="h1" variant="h5">
              FireShort
            </Typography>
            <br></br>
            <Typography component="h3" variant="h6">
              Create an account
            </Typography>
            <form onSubmit={this.handleSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="name"
                label="Full Name"
                name="fullname"
                onChange={this.handleNameChange}
                />
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
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="password2"
                label="Confirm Password"
                type="password"
                id="password2"
                onChange={this.handlePasswordChange2}
              />
              {signupError && (
                <Typography component="p" className={classes.errorText}>
                  {signupError}
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
                    "Sign Up"
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
    isSigningUp: state.auth.isSigningUp,
    isLoading: state.auth.isLoading,
    signupError: state.auth.signupError,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(SignUp));
