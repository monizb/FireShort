import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import React, { Component } from "react";
import { connect } from "react-redux";

import { loginUser, logoutUser, resendConfirmationEmail } from "../actions";

const styles = () => ({
  "@global": { body: { backgroundColor: "#040404", backgroundImage: `url("../../public/Images/verify.png")` } },
  paper: {
    marginTop: 100,
    display: "flex",
    padding: 40,
    flexDirection: "column",
    alignItems: "center",
  },
  buttonResend: {
    backgroundColor: "black"
  },
  buttonLogout: {
    backgroundColor: "red"
  },
  avatar: {
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#f50057",
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Pacifico, cursive',
    userSelect: 'none',
  },
  form: { marginTop: 1 },
  errorText: { color: "#f50057", marginBottom: 5, textAlign: "center" },
  successText: { color: "#00CC66", marginBottom: 5, textAlign: "center" },
});

const theme = createMuiTheme({ palette: { secondary: { main: "#fff" } } });

class EmailNotVerified extends Component {
  state = { email: "", password: "" };

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  handleResend = () => {
    const { dispatch } = this.props;
    dispatch(resendConfirmationEmail());
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email, password } = this.state;

    dispatch(loginUser(email, password));
  };

  render() {
    const { classes, isLoading, email, resendSuccess, resendError } = this.props;
    return (
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
          <Typography component="h5" variant="h3" className={classes.title}>
            FireShort
            </Typography>
          <br></br>
          <Typography component="h3" variant="h6">
            Email Not Verified.
            </Typography>
          <br />
          <Typography component="div" variant="body1" style={{ textAlign: "center" }}>
            A verification email has been sent to <b>{email}</b>. Verify your account and refresh this page.
            </Typography>
          <br />
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            onClick={this.handleResend}
            className={classes.buttonResend}
          >
            <MuiThemeProvider theme={theme}>
              {isLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                  "Resend Email"
                )}
            </MuiThemeProvider>
          </Button>
          <br />
          <Button
            fullWidth
            size="large"
            variant="contained"
            color="primary"
            className={classes.buttonLogout}
            onClick={this.handleLogout}
          >
            <MuiThemeProvider theme={theme}>
              Log out
                </MuiThemeProvider>
          </Button>
          <br />
          {resendSuccess && (
            <Typography component="p" className={classes.successText}>
              Email Sent
              <br></br>
            </Typography>
          )}
          {resendError && (
            <Typography component="p" className={classes.errorText}>
              {resendError}
              <br></br>
            </Typography>
          )}
        </Paper>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoading: state.auth.isLoading,
    email: state.auth.user.email ? state.auth.user.email : '',
    resendSuccess: state.auth.resendSuccess,
    resendError: state.auth.resendError
  };
}

export default withStyles(styles)(connect(mapStateToProps)(EmailNotVerified));
