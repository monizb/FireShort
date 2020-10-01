import React, { Component } from "react";
import { db } from '../firebase/firebase';
import firebase from "firebase";
import classes from "./components.module.css";
import publicIp from "public-ip"
import "../config";

class Home extends Component {
  constructor() {
    super()
    this.state = {
      loc: window.location.pathname,
      newloc: ""
    }
    document.body.style = 'background: #f1f1f1; margin: 0; padding: 0; min-height: 100vh; display: flex;justify-content: center;align-items: center;';

    const self = this;
    console.log(self.state.loc);

    if (self.state.loc === "/") {
      self.setState({ newloc: global.config.mainsite });
      window.location = global.config.mainsite;
    }
    else {
      var docid = self.state.loc.substring(1);
      var docref = db.collection('shorturls').doc(docid);
      docref.get().then(doc => {
        if (!doc.exists) {
          window.location.pathname = "/login";
        } else {
          var data = doc.data();
          if (data.track === false) {
            docref.update({ hits: firebase.firestore.FieldValue.increment(1) })
            self.setState({ newloc: data.lurl });
            window.location = data.lurl;
          } else {
            let ipv4 = "";
            (async () => {
              ipv4 = await publicIp.v4();
              docref.update({ hits: firebase.firestore.FieldValue.increment(1) })
              docref.collection("tracking").add({ ipv4: ipv4, timestamp: new Date().toLocaleString(), useragent: navigator.userAgent }).then(() => {
                self.setState({ newloc: data.lurl });
                window.location = data.lurl;
              })

            })();
          }

        }
      })
        .catch(err => {
          console.log('Error getting document', err);
        });
    }
  }

  render() {
    return (
      <div>
        <p className={classes.mainlogo}>Fireshort</p>

        <div className={classes.loader}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {/* Redirecting to <a href={this.state.newloc} target="_blank" rel="noopener noreferrer">{this.state.newloc}</a>. */}

      </div>
    );
  }
}

export default Home;
