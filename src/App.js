import React, {lazy, Suspense} from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import Analytics from "./components/Analytics";
import ProtectedRoute from "./components/ProtectedRoute";
import Loader from './components/Loader'

const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/Signup"));
const Home = lazy(() => import("./components/Home"));
const Admin = lazy(() => import("./components/Admin"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <Suspense fallback={<Loader/>}>
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
      </Suspense>
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
