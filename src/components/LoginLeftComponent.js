import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

import FeatureCard from "./FeatureCard";

const styles = () => ({
  loginLeftPart: {
    width: "50%",
    height: "initial",
    backgroundColor: "rgb(40, 40, 40)",
    padding: "50px 0px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    animation: "$colorEffect 10s ease-in-out",
    animationIterationCount: "infinite",
  },
  loginImage: {
    width: "30rem",
    transition: "all 0.1s ease-in",
    "&:hover": { transform: "scale(1.05)" },
  },
  featureContainer: {
    width: "80%",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: "1rem",
    rowGap: "0.7rem",
  },
  "@keyframes colorEffect": {
    "0%": {
      backgroundColor: "rgb(20, 20, 20)",
    },
    "50%": {
      backgroundColor: "rgb(60, 60, 60)",
    },
    "100%": {
      backgroundColor: "rgb(20, 20, 20)",
    },
  },
});

const LoginLeftComponent = ({ classes }) => {
  return (
    <Grid item className={classes.loginLeftPart}>
      <img
        className={classes.loginImage}
        src="./images/loginPageIllustration.svg"
        alt="Login Welcome"
      />
      <div className={classes.featureContainer}>
        <FeatureCard feature="Custom Tiny URLs" />
        <FeatureCard feature="Hit Tracker" />
        <FeatureCard feature="Admin Panel" />
        <FeatureCard feature="Password Protected URLs" />
      </div>
    </Grid>
  );
};

export default withStyles(styles)(LoginLeftComponent);
