import React, { Component } from 'react';
import MainToolBar from './MainToolBar.js';
import CardUrls from './CardUrls.js';
import ListUrls from './ListUrls.js';
import HitsDialog from './HitsDialog.js';
import UrlsDialog from './UrlsDialog.js';
import Footer from './Footer.js';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { nanoid } from 'nanoid';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { logoutUser, addLink, setLinks } from "../actions";
import { getFilteredLinks } from '../selectors';
import { myFirebase, db } from '../firebase/firebase';
import './components.module.css';

import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Fab,
  LinearProgress,
  Snackbar,
  Toolbar,
  Typography,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  passInput: {
    padfing: 15
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily: 'Pacifico, cursive',
    userSelect: 'none',
    color: 'white',
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    backgroundColor: '#212121',
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  appbar: {
    backgroundColor: '#212121',
  },
});

class Admin extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      loading: true,
      shortUrls: [],
      hits: [],
      formopen: false,
      hitsopen: false,
      lurl: '',
      curl: '',
      track: true,
      successToast: false,
      viewMode: 'module',
      backdrop: false,
      inputBackdrop: false,
      newPsw: '',
      currUrl: null,
    };
    this.handleLurlChange = this.handleLurlChange.bind(this);
    this.handleCurlChange = this.handleCurlChange.bind(this);
    this.handleTrackChange = this.handleTrackChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLurlChange = (event) => {
    this.setState({ lurl: event.target.value });
  };

  handleCurlChange = (event) => {
    this.setState({ curl: event.target.value });
  };

  handleTrackChange = (event) => {
    this.setState({ track: this.state.track === true ? false : true });
  };

  createLink = (curl, data) => {
    const self = this;
    db.collection('shorturls')
      .doc(curl)
      .set(data)
      .then(function () {
        self.setState({ successToast: true });
      });
  };

  handleSubmit = (event) => {
    var lurl = this.state.lurl;
    let curl = this.state.curl;
    let track = this.state.track;
    const self = this;
    if (curl === '') {
      curl = nanoid(8);
    }
    let data = {
      lurl: lurl,
      curl: curl,
      track: track,
      hits: 0,
      locked: false,
      password: '',
    };
    db.collection('shorturls')
      .doc(curl)
      .get()
      .then(function (docSnapshot) {
        if (docSnapshot.exists) {
          self.handleClose();
          confirmAlert({
            title: 'Custom URL overwrite confirm',
            message:
              'The Custom URL you entered is alread associated with some other link, clicking ok will overwrite that link to the new one. Continue?',
            buttons: [
              {
                label: 'Yes',
                onClick: () => {
                  self.createLink(curl, data);
                  self.updateUrls();
                },
              },
              {
                label: 'No',
              },
            ],
          });
        } else {
          self.createLink(curl, data);
          self.updateUrls();
        }
      });

    self.handleClose();
  };

  toggleSecurity = (curl, psw) => {
    const { shortUrls } = this.state;
    const url = shortUrls[shortUrls.findIndex((url) => url.id === curl)].data;
    this.setState({ currUrl: url });
    if (url.locked) {
      db.collection('shorturls')
        .doc(curl)
        .update({
          locked: false,
          password: '',
        })
        .then(() => this.updateUrls());
    } else {
      this.setState({ inputBackdrop: true });
    }
  };

  handleDeleteShortUrl = (curl) => {
    const self = this;
    if (window.confirm("Are you sure you want to delete this URL?")) {
      db.collection('shorturls').doc(curl).delete().then(function () {
        self.updateUrls();
      });
    }
    else return;
  }


  handleEditShortUrl = (curl) => {
    this.setState({ backdrop: true });
    const self = this;
    var docref = db.collection('shorturls').doc(curl);
    docref
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log('No such document!');
        } else {
          var data = doc.data();

          self.setState({ lurl: data.lurl });
          self.setState({ curl: data.curl });
          self.setState({ track: data.track });
          this.setState({ backdrop: false });
          self.setState({ formopen: true });
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
      });
  };

  handleClickOpen = () => {
    this.setState({ formopen: true });
    this.setState({ lurl: '' });
    this.setState({ curl: '' });
  };

  handleClose = () => {
    this.setState({ formopen: false, hitsopen: false });
  };

  handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ successToast: false });
  };

  updateUrls = () => {
    this.setState({ backdrop: true });
    const self = this;
    self.setState({ loading: true });
    self.setState({ shortUrls: [] });

    db.collection('shorturls')
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          self.setState({
            shortUrls: [...self.state.shortUrls, { id: doc.id, data: doc.data() }],
          });
        });
        self.props.setLink(self.state.shortUrls)
        self.setState({ loading: false });
        this.setState({ backdrop: false });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        self.setState({ loading: false });
      });
  };

  getHits = (id) => {
    const self = this;
    this.setState({ backdrop: true });
    self.setState({ loading: true });
    self.setState({ hits: [] });
    db.collection('shorturls')
      .doc(id)
      .collection('tracking')
      .get()
      .then((snapshot) => {
        snapshot.forEach((hit) => {
          self.setState({ hits: [...self.state.hits, { id: hit.id, data: hit.data() }] });
        });
        self.setState({ loading: false });
        this.setState({ backdrop: false });
        self.setState({ hitsopen: true });
      })
      .catch((err) => {
        console.log('Error getting documents', err);
        self.setState({ loading: false });
      });
  };

  updateViewMode = (mode) => {
    this.setState({ viewMode: mode });
    db.collection('settings').doc('viewMode').set({ value: mode });
  };

  componentDidMount() {
    const self = this;
    myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.setState({ user });
        self.updateUrls();
        var viewModeRef = db.collection('settings').doc('viewMode');
        viewModeRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log('No viewMode set!');
            } else {
              var data = doc.data();
              self.setState({ viewMode: data.value });
            }
          })
          .catch((err) => {
            console.log('Error getting viewMode', err);
          });
      } else {
        self.setState({ user: null });
      }
    });
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(logoutUser());
  };

  onPswSave = (e) => {
    const curl = this.state.currUrl.curl;
    if (this.state.newPsw !== '') {
      db.collection('shorturls')
        .doc(curl)
        .update({
          locked: true,
          password: this.state.newPsw,
        })
        .then(() => {
          this.setState({ inputBackdrop: false });
          this.updateUrls();
        });
    } else {
      alert('Password cannot be empty.');
    }
  };

  render() {
    const { classes } = this.props;
    const { inputBackdrop, newPsw } = this.state;

    return (
      <React.Fragment>
        {inputBackdrop ? (
          <div
            style={{
              position: 'fixed',
              width: '100vw',
              height: '100vh',
              background: 'rgb(0,0,0,.5)',
              display: 'grid',
              placeItems: 'center',
              zIndex: 10,
            }}
          >
            <div style={{ padding: "20px", backgroundColor: "white" }}>
              <h3>Protect Link With Password</h3>
              <div style={{ display: "block", padding: "20px" }}>
                <input
                  placeholder='Enter Password...'
                  value={newPsw}
                  style={{ padding: "15px", fontSize: "15px", borderRadius: "2px", width: "100%" }}
                  onChange={(e) => this.setState({ newPsw: e.target.value })}
                />
                <div style={{ marginTop: "25px" }}>
                  <button onClick={(e) => this.onPswSave(e)} style={{ padding: "12px", color: "white", backgroundColor: "black", fontSize: "15px", border: "none", marginRight: "15px", borderRadius: "5px", cursor: "pointer" }}>Save</button>
                  <button onClick={(e) => this.setState({ inputBackdrop: false })} style={{ padding: "12px", color: "white", backgroundColor: "red", fontSize: "15px", border: "none", marginRight: "15px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
        <CssBaseline />
        <div className={classes.root}>
          <AppBar position='fixed' className={classes.appbar}>
            <Toolbar>
              <Typography variant='h6' className={classes.title}>
                FireShort
              </Typography>
              <Button color='inherit' onClick={this.handleLogout}>
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </div>
        {this.state.loading && <LinearProgress color='secondary' />}
        <main>
          <MainToolBar
            state={this.state}
            updateViewMode={this.updateViewMode}
            refresh={this.updateUrls}
          />
          {this.state.shortUrls.length > 0 ? (
            <>
              {this.state.viewMode === 'module' ? (
                <CardUrls
                  shortUrls={this.props.links}
                  handleEditShortUrl={this.handleEditShortUrl}
                  handleDeleteShortUrl={this.handleDeleteShortUrl}
                  openHits={this.getHits}
                // updateHits={this.updateUrls}
                />
              ) : (
                  <ListUrls
                    shortUrls={this.state.shortUrls}
                    handleEditShortUrl={this.handleEditShortUrl}
                    handleDeleteShortUrl={this.handleDeleteShortUrl}
                    toggleSecurity={this.toggleSecurity}
                  />
                )}
            </>
          ) : (
              <div className={classes.heroContent}>
                <Container maxWidth='sm'>
                  {/* <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    Oops! Nothing here.
                  </Typography> */}
                </Container>
              </div>
            )}

          <Fab
            aria-label='Add'
            className={classes.fab}
            color='primary'
            onClick={this.handleClickOpen}
          >
            <AddIcon />
          </Fab>

          <Backdrop className={classes.backdrop} open={this.state.backdrop}>
            <CircularProgress color='inherit' />
          </Backdrop>

          <UrlsDialog
            state={this.state}
            handleClose={this.handleClose}
            handleLurlChange={this.handleLurlChange}
            handleCurlChange={this.handleCurlChange}
            handleSubmit={this.handleSubmit}
            handleTrackChange={this.handleTrackChange}
          />

          <HitsDialog
            state={this.state}
            hitActivity={this.state.hits}
            handleClose={this.handleClose}
          />

          <Snackbar
            open={this.state.successToast}
            autoHideDuration={6000}
            onClose={this.handleToastClose}
          >
            <Alert onClose={this.handleToastClose} severity='success'>
              Successfully added!
            </Alert>
          </Snackbar>
        </main>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggingOut: state.auth.isLoggingOut,
    links: getFilteredLinks(state.links, state.filter)
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLink: (data) => dispatch(addLink(data)),
    setLink: (data) => dispatch(setLinks(data))
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Admin));
