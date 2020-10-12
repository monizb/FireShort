<<<<<<< HEAD
import React, { Component } from "react";
import MainToolBar from "./MainToolBar.js";
import CardUrls from "./CardUrls.js";
import ListUrls from "./ListUrls.js";
import HitsDialog from "./HitsDialog.js";
import UrlsDialog from "./UrlsDialog.js";
import Footer from "./Footer.js";
import ShareDialog, { ShareAsJPG } from "../components/ShareDialog";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { nanoid } from "nanoid";
import { connect } from "react-redux";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { logoutUser } from "../actions";
import { myFirebase, db } from "../firebase/firebase";
import "./components.module.css";
import { shareTwitterURL } from "share-twitter";
import shareFacebook from "share-facebook";
=======
import React, { Component } from 'react';
import MainToolBar from './MainToolBar.js';
import CardUrls from './CardUrls.js';
import ListUrls from './ListUrls.js';
import HitsDialog from './HitsDialog.js';
import UrlsDialog from './UrlsDialog.js';
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

>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
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
<<<<<<< HEAD
} from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import MuiAlert from "@material-ui/lab/Alert";
=======
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b

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
<<<<<<< HEAD
    fontFamily: "Pacifico, cursive",
    userSelect: "none",
    color: "white",
=======
    fontFamily: 'Pacifico, cursive',
    userSelect: 'none',
    color: 'white',
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
  },
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    backgroundColor: '#212121',
    right: theme.spacing(2),
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  appbar: {
<<<<<<< HEAD
    backgroundColor: "#212121",
=======
    backgroundColor: '#212121',
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
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
      locked: false,
      successToast: false,
<<<<<<< HEAD
      viewMode: "module",
      backdrop: false,
      shareOpen: false,
      QRlink: null,
      imgurl: null,
      url: null,
      jpgShareOpen: false,
      jpgimg: null,
      snackOpen: false,
=======
      viewMode: 'module',
      backdrop: false,
      inputBackdrop: false,
      newPsw: '',
      currUrl: null,
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
    };
    this.handleLurlChange = this.handleLurlChange.bind(this);
    this.handleCurlChange = this.handleCurlChange.bind(this);
    this.handleTrackChange = this.handleTrackChange.bind(this);
    this.handleProtectChange = this.handleProtectChange.bind(this);
    this.handlePswChange = this.handlePswChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLurlChange = (event) => {
    this.setState({ lurl: event.target.value });
  };

  handleCurlChange = (event) => {
    this.setState({ curl: event.target.value });
  };

  handleTrackChange = (event) => {
<<<<<<< HEAD
    this.setState({ track: this.state.track === true ? false : true });
  };

  createLink = (curl, data) => {
    const self = this;
    db.collection("shorturls")
      .doc(curl)
      .set(data)
      .then(function () {
        self.setState({
          successToast: true,
          shareOpen: true,
          QRlink: data.lurl,
          curl: data.curl,
        });
=======
    this.setState({ track: !this.state.track });
  };

  handleProtectChange = (event) => {
    console.log(event, 'toggle protect')
    this.setState({ locked: !this.state.locked });
  };

  handlePswChange = ({target}) => {
    this.setState({ newPsw: target.value})
  }

  createLink = (curl, data) => {
    const self = this;
    db.collection('shorturls')
      .doc(curl)
      .set(data)
      .then(function () {
        self.setState({ successToast: true });
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
      });
  };

  handleSubmit = (event) => {
    let {lurl, curl, track, locked, newPsw} = this.state
    const self = this;
<<<<<<< HEAD
    if (curl === "") {
=======
    if (curl === '') {
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
      curl = nanoid(8);
    }
    let data = {
      lurl: lurl,
      curl: curl,
      track: track,
<<<<<<< HEAD
      hits: 0,
    };
    db.collection("shorturls")
=======
      locked: locked,
      password: locked ? newPsw : '',
      hits: 0,
      author: this.props.user.uid
    };
    db.collection('shorturls')
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
      .doc(curl)
      .get()
      .then(function (docSnapshot) {
        if (docSnapshot.exists) {
          self.handleClose();
<<<<<<< HEAD
          confirmAlert({
            title: "Custom URL overwrite confirm",
            message:
              "The Custom URL you entered is alread associated with some other link, clicking ok will overwrite that link to the new one. Continue?",
            buttons: [
              {
                label: "Yes",
                onClick: () => {
                  self.createLink(curl, data);
                  self.updateUrls();
                },
              },
              {
                label: "No",
              },
            ],
          });
=======
          if(docSnapshot.data().author === self.props.user.uid){
            confirmAlert({
              title: 'Custom URL overwrite confirm',
              message:
                'The Custom URL you entered is already associated with some other link, clicking ok will overwrite that link to the new one. Continue?',
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
            confirmAlert({
              title: 'Custom URL already created by other user.',
              message:
                'The Custom URL you entered is already associated with some other link and owned by another user.',
              buttons: [
                {
                  label: 'Ok'
                },
              ],
            });
          }

>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
        } else {
          self.createLink(curl, data);
          self.updateUrls();
        }
      });
<<<<<<< HEAD
    self.handleClose();
  };

  handleDeleteShortUrl = (curl) => {
    const self = this;
    db.collection("shorturls")
      .doc(curl)
      .delete()
      .then(function () {
        self.updateUrls();
      });
  };
=======

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

    confirmAlert({
      title: 'Confirm Deletion',
      message: 'Are you sure you want to delete this URL?',
      buttons: [
        {
          label: 'Delete',
          onClick: () => {
            db.collection('shorturls').doc(curl).delete().then(function () {
              self.updateUrls();
            });
          }
        },
        {
          label: 'Back',
          onClick: () => { return; }
        }
      ]
    });
  }
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b

  handleEditShortUrl = (curl) => {
    this.setState({ backdrop: true });
    const self = this;
<<<<<<< HEAD
    var docref = db.collection("shorturls").doc(curl);
=======
    var docref = db.collection('shorturls').doc(curl);
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
    docref
      .get()
      .then((doc) => {
        if (!doc.exists) {
<<<<<<< HEAD
          console.log("No such document!");
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
        console.log("Error getting document", err);
=======
          console.log('No such document!');
        } else {
          var data = doc.data();
          // reduce number of calls to setState
          self.setState({
            lurl: data.lurl,
            curl: data.curl,
            track: data.track,
            locked: data.locked,
            newPsw: data.password,
            backdrop: false,
            formopen: true
          });
        }
      })
      .catch((err) => {
        console.log('Error getting document', err);
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
      });
  };

  handleClickOpen = () => {
    this.setState({ formopen: true });
    this.setState({
      lurl: '', curl: '', newPsw: '', locked: false
    });
  };

  handleClose = () => {
<<<<<<< HEAD
    this.setState({
      formopen: false,
      hitsopen: false,
    });
  };

  handleShareOpen = (curl) => {
    this.setState({ shareOpen: true });
    var docref = db.collection("shorturls").doc(curl);
    docref
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          var data = doc.data();
          this.setState({ QRlink: data.lurl, curl: data.curl });
        }
      })
      .catch((err) => {
        console.log("Error getting document", err);
      });
  };

  handleSnackClose = () => {
    this.setState({ snackOpen: false });
  };

  handleShareClose = () => {
    this.setState({ shareOpen: false, QRlink: null, url: null });
  };

  handleShareJPGClose = () => {
    this.setState({ jpgShareOpen: false, url: null });
  };

  handleQRCode = () => {
    this.setState({ url: this.state.QRlink });
  };

  handleCopy = () => {
    navigator.clipboard.writeText(
      window.location.origin + "/" + this.state.curl
    );
    this.setState({ snackOpen: true });
  };

  handleJPGShare = () => {
    this.setState({ url: this.state.QRlink });
    setTimeout(() => {
      const canvas = document.getElementById("QR");
      const imguri = canvas.toDataURL("image/jpeg", 1);
      this.setState({
        jpgShareOpen: true,
        shareOpen: false,
        jpgimg: imguri,
      });
    }, 1000);
  };

  handleFacebookShare = () => {
    const share = shareFacebook({
      app_id: "2782057852009688",
      display: "page",
      href: this.state.QRlink,
    });
    window.open(share);
  };

  handleTwitterShare = () => {
    const share = shareTwitterURL({
      url: window.location.origin + "/" + this.state.curl,
    });
    window.open(share);
=======
    this.setState({ formopen: false, hitsopen: false });
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
  };

  handleToastClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ successToast: false });
  };

  updateUrls = async  () => {
    this.setState({ backdrop: true });
    const self = this;
    self.setState({ loading: true });
    self.setState({ shortUrls: [] });
<<<<<<< HEAD

    db.collection("shorturls")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          self.setState({
            shortUrls: [
              ...self.state.shortUrls,
              { id: doc.id, data: doc.data() },
            ],
          });
        });
        self.setState({ loading: false });
        this.setState({ backdrop: false });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
        self.setState({ loading: false });
      });
=======
    try{
      const shortUrls = new Map();
      const curlSnaps = await db.collection('shorturls')
                        .where("author","==",this.props.user.uid)
                        .get();
      const hitSnaps =  await db.collection('hits')
                        .where("author","==",this.props.user.uid)
                        .get();
      curlSnaps.forEach(curl=>{
        shortUrls.set(curl.data().curl,curl.data());
      });
      hitSnaps.forEach(hit=>{
        const curl = shortUrls.get(hit.data().curl);
        if(curl){
          curl.hits = hit.data().hits;
        }
      });
      const shortUrlFinalList = [];
      shortUrls.forEach(curl=>{
        shortUrlFinalList.push({id: curl.curl, data: curl});
      });
      self.setState({shortUrls: shortUrlFinalList});
      self.props.setLink(self.state.shortUrls)
      self.setState({ loading: false });
      this.setState({ backdrop: false });
    }
    catch(err){
      console.log('Error getting documents', err);
      self.setState({ loading: false });
    }
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
  };

  getHits = (id) => {
    const self = this;
    this.setState({ backdrop: true });
    self.setState({ loading: true });
    self.setState({ hits: [] });
<<<<<<< HEAD
    db.collection("shorturls")
      .doc(id)
      .collection("tracking")
      .get()
      .then((snapshot) => {
        snapshot.forEach((hit) => {
          self.setState({
            hits: [...self.state.hits, { id: hit.id, data: hit.data() }],
          });
=======
    db.collection('shorturls')
      .doc(id)
      .collection('tracking')
      .where("author","==",this.props.user.uid)
      .get()
      .then((snapshot) => {
        snapshot.forEach((hit) => {
          self.setState({ hits: [...self.state.hits, { id: hit.id, data: hit.data() }] });
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
        });
        self.setState({ loading: false });
        this.setState({ backdrop: false });
        self.setState({ hitsopen: true });
      })
      .catch((err) => {
        console.log("Error getting documents", err);
        self.setState({ loading: false });
      });
  };

  updateViewMode = (mode) => {
    this.setState({ viewMode: mode });
<<<<<<< HEAD
    db.collection("settings").doc("viewMode").set({ value: mode });
=======
    db.collection('settings').doc(this.props.user.uid).set({ viewMode: mode });
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
  };

  componentDidMount() {
    const self = this;
    myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.setState({ user });
        self.updateUrls();
<<<<<<< HEAD
        var viewModeRef = db.collection("settings").doc("viewMode");
=======
        var viewModeRef = db.collection('settings').doc(user.uid);
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
        viewModeRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log("No viewMode set!");
            } else {
              var data = doc.data();
<<<<<<< HEAD
              self.setState({ viewMode: data.value });
            }
          })
          .catch((err) => {
            console.log("Error getting viewMode", err);
=======
              self.setState({ viewMode: data.viewMode });
            }
          })
          .catch((err) => {
            console.log('Error getting viewMode', err);
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
          });
      } else {
        self.setState({ user: null });
      }
    });
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
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
<<<<<<< HEAD
              {this.state.viewMode === "module" ? (
                <CardUrls
                  shortUrls={this.state.shortUrls}
                  handleEditShortUrl={this.handleEditShortUrl}
                  handleShareOpen={this.handleShareOpen}
                  handleDeleteShortUrl={this.handleDeleteShortUrl}
                  openHits={this.getHits}
                  // updateHits={this.updateUrls}
                />
              ) : (
                <ListUrls
                  shortUrls={this.state.shortUrls}
                  handleEditShortUrl={this.handleEditShortUrl}
                  handleShareOpen={this.handleShareOpen}
                  handleDeleteShortUrl={this.handleDeleteShortUrl}
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
=======
              {this.state.viewMode === 'module' ? (
                <CardUrls
                  shortUrls={this.props.links}
                  handleEditShortUrl={this.handleEditShortUrl}
                  handleDeleteShortUrl={this.handleDeleteShortUrl}
                  openHits={this.getHits}
                // updateHits={this.updateUrls}
                  toggleSecurity={this.toggleSecurity}
                />
              ) : (
                  <ListUrls
                    shortUrls={this.state.shortUrls}
                    handleEditShortUrl={this.handleEditShortUrl}
                    handleDeleteShortUrl={this.handleDeleteShortUrl}
                    toggleSecurity={this.toggleSecurity}
                    openHits={this.getHits}
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
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b

          <Fab
            aria-label='Add'
            className={classes.fab}
            color='primary'
<<<<<<< HEAD
            onClick={this.handleClickOpen}>
=======
            onClick={this.handleClickOpen}
          >
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
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
            handleProtectChange={this.handleProtectChange}
            handlePswChange={this.handlePswChange}
          />

          <HitsDialog
            state={this.state}
            hitActivity={this.state.hits}
            handleClose={this.handleClose}
          />

<<<<<<< HEAD
          <ShareDialog
            url={this.state.url}
            surl={this.state.curl}
            open={this.state.shareOpen}
            snackOpen={this.state.snackOpen}
            handleCopy={this.handleCopy}
            handleJPG={this.handleJPGShare}
            handleQRCode={this.handleQRCode}
            handleMail={this.handlEmailShare}
            handleClose={this.handleShareClose}
            handleTwitter={this.handleTwitterShare}
            handleSnackClose={this.handleSnackClose}
            handleFacebook={this.handleFacebookShare}
          />

          <ShareAsJPG
            handleClose={this.handleShareJPGClose}
            url={this.state.url}
            imgurl={this.state.jpgimg}
            open={this.state.jpgShareOpen}
          />

          <Snackbar
            open={this.state.successToast}
            autoHideDuration={6000}
            onClose={this.handleToastClose}>
=======
          <Snackbar
            open={this.state.successToast}
            autoHideDuration={6000}
            onClose={this.handleToastClose}
          >
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
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
<<<<<<< HEAD
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Admin));
=======
    links: getFilteredLinks(state.links, state.filter),
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLink: (data) => dispatch(addLink(data)),
    setLink: (data) => dispatch(setLinks(data)),
    logout: () => dispatch(logoutUser())
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Admin));
>>>>>>> 30577770a12101ffe292b530fe624245f323b59b
