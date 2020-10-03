import "../config";

import firebase from "firebase";
import publicIp from "public-ip";
import React, { Component } from "react";

import { db } from "../firebase/firebase";

import classes from "./components.module.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loc: window.location.pathname,
      newloc: "",
      loading: true,
      isLocked: true,
      realPassword: "",
      password: "",
    };
    document.body.style =
      "background: #f1f1f1; margin: 0; padding: 0; min-height: 100vh; display: flex;justify-content: center;align-items: center;";
  }

  componentDidMount() {
    this.startFunc(true);
  }

  startFunc = (isLocked) => {
    this.setState({ loading: true });
    if (this.state.loc === "/") {
      this.setState({ newloc: global.config.mainsite });
      window.location = global.config.mainsite;
    } else {
      var docid = this.state.loc.substring(1);
      var docref = db.collection("shorturls").doc(docid);
      docref
        .get()
        .then((doc) => {
          var data = doc.data();
          this.setState({ realPassword: data.password });
          if (!doc.exists) {
            window.location.pathname = "/login";
          } else {
            if (!data.locked || !isLocked) {
              this.setState({ isLocked: false });
              if (data.track === false) {
                docref.update({
                  hits: firebase.firestore.FieldValue.increment(1),
                });
                this.setState({ newloc: data.lurl });
                window.location = data.lurl;
              } else {
                let ipv4 = "";
                (async () => {
                  ipv4 = await publicIp.v4();
                  //update the hits count
                  const hitref = db.collection('hits').doc(docid);
                  hitref
                  .update({
                    hits: firebase.firestore.FieldValue.increment(1),
                  })
                  .catch(error=>{
                    //hit document is not created yet.
                    if(error.code)
                    hitref
                    .set({
                      hits: 1,
                      curl: docid,
                      author: data.author
                    });
                  });
                  docref
                    .collection("tracking")
                    .add({
                      ipv4: ipv4,
                      timestamp: new Date().toLocaleString(),
                      useragent: navigator.userAgent,
                      author: data.author
                    })
                    .then(() => {
                      this.setState({ newloc: data.lurl });
                      window.location = data.lurl;
                    });
                })();
              }
            } else {
              this.setState({ loading: false, isLocked: true });
            }
          }
        })
        .catch((err) => {
          console.log("Error getting document", err);
        });
    }
  };

  checkpassword = () => {
    const { realPassword } = this.state;
    if (realPassword !== "" && this.state.password === realPassword) {
      this.setState({ isLocked: false }, () => this.startFunc(false));
    } else {
      alert("Invalid Link Password");
    }
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    const { loading, password, isLocked } = this.state;
    return (
      <div>
        {loading ? (
          <>
            <p className={classes.mainlogo}>Fireshort</p>
            <div className={classes.loader}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </>
        ) : isLocked ? (
          <div>
            <p className={classes.mainlogo}>Fireshort</p>
            <div style={{ display: "flex" }}>
              <input
                type="password"
                placeholder="Enter Link Password"
                value={password}
                style={{
                  padding: "15px",
                  fontSize: "15px",
                  borderRadius: "2px",
                  width: "100%",
                }}
                onChange={(e) => this.onPasswordChange(e)}
              />
              <button
                onClick={(e) => this.checkpassword()}
                style={{
                  padding: "12px",
                  color: "white",
                  backgroundColor: "black",
                  fontSize: "15px",
                  border: "none",
                  marginRight: "15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginLeft: "10px",
                }}
              >
                Go
              </button>
            </div>
          </div>
        ) : null}

        {/* Redirecting to <a href={this.state.newloc} target="_blank" rel="noopener noreferrer">{this.state.newloc}</a>. */}
      </div>
    );
  }
}

export default Home;
