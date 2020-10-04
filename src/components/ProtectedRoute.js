import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import EmailNotVerified from "./EmailNotVerified";

const ProtectedRoute = ({
  component: Component,
  isAuthenticated,
  isVerifying,
  emailVerified,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      isVerifying ? (
        <div />
      ) : isAuthenticated ? (
        emailVerified ?
        <Component {...props} />
        :
        <EmailNotVerified {...props}/>
      ) : (
        <Redirect
          to={{
            pathname: "/login",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = state => ({
  emailVerified: state.auth.user.emailVerified ? true : false
});

export default connect(mapStateToProps)(ProtectedRoute);
