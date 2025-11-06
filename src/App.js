// Random utility function
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// New feature: Display random number on the app
import React, { useState } from 'react';

function RandomNumberFeature() {
  const [number, setNumber] = useState(0);
  return (
    <div style={{margin: '20px', padding: '10px', border: '1px solid #ccc'}}>
      <h3>Random Number Feature</h3>
      <p>Number: {number}</p>
      <button onClick={() => setNumber(getRandomInt(100))}>Generate Random Number</button>
    </div>
  );
}
import React from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import Admin from "./components/Admin";
import Analytics from "./components/Analytics";
import SignUp from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <ProtectedRoute
        exact
        path="/analytics/:id"
        component={Analytics}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <ProtectedRoute
        exact
        path="/admin"
        component={Admin}
        isAuthenticated={isAuthenticated}
        isVerifying={isVerifying}
      />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/" component={Home} />
      <RandomNumberFeature />
    </Switch>
  );
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    isVerifying: state.auth.isVerifying
  };
}

export default connect(mapStateToProps)(App);
