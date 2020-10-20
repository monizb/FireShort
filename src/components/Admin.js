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
import { addLink, setLinks } from "../actions";
import { getFilteredLinks } from '../selectors';
import { myFirebase, db } from '../firebase/firebase';
import './components.module.css';

import {
  Container,
  CssBaseline,
  Fab,
  LinearProgress,
  Snackbar,
} from '@material-ui/core';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import MuiAlert from '@material-ui/lab/Alert';
import Header from './Header.js';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  passInput: {
    padding: 15,
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
      locked: false,
      expired:false,
      endDate:'',
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
    this.handleProtectChange = this.handleProtectChange.bind(this);
    this.handleExpireChange = this.handleExpireChange.bind(this);
    this.handlePswChange = this.handlePswChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleExpireChange=(event) =>{
    this.setState({curl:event.target.value})
  };
  handleLurlChange = (event) => {
    this.setState({ lurl: event.target.value });
  };

  handleCurlChange = (event) => {
    this.setState({ curl: event.target.value });
  };

  handleTrackChange = (event) => {
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
      });
  };

  handleSubmit = (event) => {
    let {lurl, curl, track, locked, expired, endDate, newPsw} = this.state
    const self = this;
    if (curl === '') {
      curl = nanoid(8);
    }
    let data = {
      lurl: lurl,
      curl: curl,
      track: track,
      expired:expired,
      expiration: expired ? endDate:'',
      locked: locked,
      password: locked ? newPsw : '',
      hits: 0,
      author: this.props.user.uid
    };
    db.collection('shorturls')
      .doc(curl)
      .get()
      .then(function (docSnapshot) {
        if (docSnapshot.exists) {
          self.handleClose();
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

  handleLinkExpire=(curl) => {
    this.setState({ backdrop:true})
    const {shortUrls} = this.state;
    const url = shortUrls[shortUrls.findIndex((url) => url.id === curl)].data;
    this.setState({ currUrl: url });
    if(url.expired){
      db.collection('shorturls')
        .doc(curl)
        .update({
              expiration:false,
              endDate:'',
            })
        .then(()=>this.updateUrls())
    }else{
      this.setState({inputExpired:true});
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
      });
  };

  handleClickOpen = () => {
    this.setState({ formopen: true });
    this.setState({
      lurl: '', curl: '', newPsw: '', locked: false
    });
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

  updateUrls = async  () => {
    this.setState({ backdrop: true });
    const self = this;
    self.setState({ loading: true });
    self.setState({ shortUrls: [] });
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
  };

  getHits = (id) => {
    const self = this;
    this.setState({ backdrop: true });
    self.setState({ loading: true });
    self.setState({ hits: [] });
    db.collection('shorturls')
      .doc(id)
      .collection('tracking')
      .where("author","==",this.props.user.uid)
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
    db.collection('settings').doc(this.props.user.uid).set({ viewMode: mode });
  };

  componentDidMount() {
    const self = this;
    myFirebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.setState({ user });
        self.updateUrls();
        var viewModeRef = db.collection('settings').doc(user.uid);
        viewModeRef
          .get()
          .then((doc) => {
            if (!doc.exists) {
              console.log('No viewMode set!');
            } else {
              var data = doc.data();
              self.setState({ viewMode: data.viewMode });
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
  onNewDate = (e) =>{
    const curl = this.state.currUrl.curl;
    if (this.state.endDate !== '') {
      db.collection('shorturls')
        .doc(curl)
        .update({
          expiration: true,
          endDate: this.state.endDate,
        })
        .then(() => {
          this.setState({ inputExpired: false });
          this.updateUrls();
        });
    } else {
        db.collection('shorturls')
        .doc(curl)
        .update({
          expiration:false,
        })
        .then(() =>{
          this.setState({inputExpired:false});
          this.updateUrls();
        });
    }
  }
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
    const { inputBackdrop, inputExpired, newPsw, endDate } = this.state;
 

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
        {inputExpired ? (
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
              <h3>Pick a time for link to expire.</h3>
              <div style={{ display: "block", padding: "20px" }}>
                <input
                  placeholder='Select a date and time'
                  value={endDate}
                  style={{ padding: "15px", fontSize: "15px", borderRadius: "2px", width: "100%" }}
                  onChange={(e) => this.setState({ endDate: e.target.value })}
                />
                <div style={{ marginTop: "25px" }}>
                  <button onClick={(e) => this.onNewDate(e)} style={{ padding: "12px", color: "white", backgroundColor: "black", fontSize: "15px", border: "none", marginRight: "15px", borderRadius: "5px", cursor: "pointer" }}>Set Time</button>
                  <button onClick={(e) => this.setState({ inputBackdrop: false })} style={{ padding: "12px", color: "white", backgroundColor: "red", fontSize: "15px", border: "none", marginRight: "15px", borderRadius: "5px", cursor: "pointer" }}>Cancel</button>
                </div>
              </div>
            </div>
          </div>
        ):null}
        <CssBaseline />
        <Header />
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
                  handleLinkExpire={this.handleLinkExpire}
                  handleEditShortUrl={this.handleEditShortUrl}
                  handleDeleteShortUrl={this.handleDeleteShortUrl}
                  openHits={this.getHits}
                // updateHits={this.updateUrls}
                  toggleSecurity={this.toggleSecurity}
                />
              ) : (
                  <ListUrls
                    shortUrls={this.state.shortUrls}
                    handleLinkExpire={this.handleLinkExpire}
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
            handleExpireChange={this.handleExpireChange}
            handleProtectChange={this.handleProtectChange}
            handlePswChange={this.handlePswChange}
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
    links: getFilteredLinks(state.links, state.filter),
    user: state.auth.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addLink: (data) => dispatch(addLink(data)),
    setLink: (data) => dispatch(setLinks(data)),
  };
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Admin));
