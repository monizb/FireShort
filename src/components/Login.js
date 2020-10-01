import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loginUser } from '../actions';

const styles = () => ({
  '@global': { body: { backgroundColor: '#fff' } },
  paper: {
    marginTop: 100,
    display: 'flex',
    padding: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: '#f50057',
  },
  form: { marginTop: 1 },
  errorText: { color: '#f50057', marginBottom: 5, textAlign: 'center' },
});

const theme = createMuiTheme({ palette: { secondary: { main: '#fff' } } });

class Login extends Component {
  state = { email: '', password: '' };

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
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar} src="/favicon.ico"></Avatar>
            <Typography component="h1" variant="h5">
              FireShort
            </Typography>
            <br></br>
            <form onSubmit={this.handleSubmit}>
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
                  {isLoading ? <CircularProgress color="secondary" /> : 'Sign In'}
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
