import React, {lazy, Suspense} from "react";

import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = lazy(() => import("./components/ProtectedRoute"));
const Login = lazy(() => import("./components/Login"));
const SignUp = lazy(() => import("./components/Signup"));
const Home = lazy(() => import("./components/Home"));
const Admin = lazy(() => import("./components/Admin"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const Analytics = lazy(() => import("./components/Analytics"));

function App(props) {
  const { isAuthenticated, isVerifying } = props;
  return (
    <Switch>
      <Suspense fallback={<div>Loading Page...</div>}>
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
