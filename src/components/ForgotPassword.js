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
import {Link} from "react-router-dom";

import { sendPasswordResetLink } from "../actions";

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
  successText: { color: "#00CC66", marginBottom: 5, textAlign: "center" },
});

const theme = createMuiTheme({ palette: { secondary: { main: "#fff" } } });

class ForgotPassword extends Component {
  state = { email: ""};

  handleEmailChange = ({ target }) => {
    this.setState({ email: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props;
    const { email } = this.state;

    dispatch(sendPasswordResetLink(email));
  };
  render() {
    const { classes, sendPassResetSuccess, sendPassResetError, isLoading } = this.props;
    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper}>
            <Avatar className={classes.avatar} src="/favicon.ico"></Avatar>
            <Typography component="h1" variant="h5">
            FireShort
            </Typography>
            <br></br>
            <Typography component="h6" variant="h6">
            Password Reset
            </Typography>
            <form onSubmit={this.handleSubmit} style={{width: "100%"}}>
            <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                onChange={this.handleEmailChange}
            />
            {sendPassResetError && (
                <Typography component="p" className={classes.errorText}>
                {sendPassResetError}
                </Typography>
            )}
            {sendPassResetSuccess && (
                <Typography component="p" className={classes.successText}>
                    Password reset link sent!
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
                    "Send Password Reset Link"
                )}
                </MuiThemeProvider>
            </Button>
            </form>            
            <div style={{padding: "0.5rem", widht: "100%", textAlign:"center"}}>
                <Typography component="p">
                  <Link to="/login">
                    Log in?
                    </Link>
                </Typography>
            </div>
        </Paper>
        </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    sendPassResetSuccess: state.auth.sendPassResetSuccess,
    isLoading: state.auth.isLoading,
    sendPassResetError: state.auth.sendPassResetError,
  };
}

export default withStyles(styles)(connect(mapStateToProps)(ForgotPassword));
