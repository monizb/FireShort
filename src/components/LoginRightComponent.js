import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/styles";
import React from "react";
import Lottie from "react-lottie";

import LinkData from "../lotties/link.json";

import FeatureCard from "./FeatureCard";

const styles = () => ({
  loginLeftPart : {
    flex : 1,
    backgroundColor : "black",
    padding : "80px",
    display : "flex",
    flexDirection : "column",
    justifyContent : "space-between",
    overflow : "hidden",
    backgroundImage : `url(./Images/pattern.jpg)`,
    backgroundSize : "cover",
  },
  loginImage : {
    width : "30rem",
    transition : "all 0.1s ease-in",
    "&:hover" : {transform : "scale(1.05)"},
  },
  loginText : {
    color : "white",
    fontSize : "3.5rem",
  },
  subText : {
    color : "white",
    fontSize : "1.5rem",
  },
  left : {},
  featureContainer : {
    display : "flex",
    alignItems : "center",
    flexWrap : "wrap",
    columnGap : "0.5rem",
    rowGap : "0.7rem",
    padding : "40px 0px 0px 0px",
  },
});

const LoginLeftComponent = ({classes}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: LinkData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Grid item className={classes.loginLeftPart}>
      <Lottie options={defaultOptions} height={400} width={400} />
      <Grid item className={classes.left}>
        <Typography className={classes.loginText} component="h2" variant="h2">
          Welcome to Fireshort
        </Typography>
        <Typography className={classes.subText} component="h2" variant="h2">
          Everything is short here.
        </Typography>
        <div className={classes.featureContainer}>
          <FeatureCard feature="Custom Tiny URLs" />
          <FeatureCard feature="Hit Tracker" />
          <FeatureCard feature="Admin Panel" />
          <FeatureCard feature="Passowrd Protected URLs" />
        </div>
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(LoginLeftComponent);
