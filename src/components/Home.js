import React, { Component } from 'react';
import { db } from '../firebase/firebase';
import firebase from 'firebase';
import classes from './components.module.css';
import publicIp from 'public-ip';
import '../config';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loc: window.location.pathname,
      newloc: '',
      loading: true,
      isLocked: true,
      realPassword: '',
      password: '',
    };
    document.body.style =
      'background: #f1f1f1; margin: 0; padding: 0; min-height: 100vh; display: flex;justify-content: center;align-items: center;';
    this.startFunc(true);
  }

  startFunc = (isLocked) => {
    this.setState({ loading: true });
    if (this.state.loc === '/') {
      this.setState({ newloc: global.config.mainsite });
      window.location = global.config.mainsite;
    } else {
      var docid = this.state.loc.substring(1);
      var docref = db.collection('shorturls').doc(docid);
      docref
        .get()
        .then((doc) => {
          var data = doc.data();
          console.log(data.password);
          this.setState({ loading: false, realPassword: data.password });
          if (!doc.exists) {
            window.location.pathname = '/login';
          } else {
            if (!data.locked || !isLocked) {
              this.setState({ isLocked: false });
              if (data.track === false) {
                docref.update({ hits: firebase.firestore.FieldValue.increment(1) });
                this.setState({ newloc: data.lurl });
                window.location = data.lurl;
              } else {
                let ipv4 = '';
                (async () => {
                  ipv4 = await publicIp.v4();
                  // ipv6 = await publicIp.v6();
                  docref.update({ hits: firebase.firestore.FieldValue.increment(1) });
                  docref
                    .collection('tracking')
                    .add({
                      ipv4: ipv4,
                      timestamp: new Date().toLocaleString(),
                      useragent: navigator.userAgent,
                    })
                    .then(() => {
                      this.setState({ newloc: data.lurl });
                      window.location = data.lurl;
                    });
                })();
              }
            } else {
              this.setState({ isLocked: true });
            }
          }
        })
        .catch((err) => {
          console.log('Error getting document', err);
        });
    }
  };

  onPasswordChange = (e) => {
    const { realPassword } = this.state;
    this.setState({ password: e.target.value });
    if (realPassword !== '' && e.target.value === realPassword) {
      this.setState({ isLocked: false }, () => this.startFunc(false));
    }
  };

  render() {
    const { loading, password, isLocked } = this.state;
    return (
      <div>
        {loading ? (
          <>
            <div className={classes.loader}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className={classes.mainlogo}>Fireshort</p>
          </>
        ) : isLocked ? (
          <input
            type='password'
            placeholder='Type password...'
            value={password}
            onChange={(e) => this.onPasswordChange(e)}
          />
        ) : null}

        {/* Redirecting to <a href={this.state.newloc} target="_blank" rel="noopener noreferrer">{this.state.newloc}</a>. */}
      </div>
    );
  }
}

export default Home;
