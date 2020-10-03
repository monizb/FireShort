import { Grid } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/styles";
import Lottie from "react-lottie";
import LinkData from "../lotties/link.json";
import React from "react";

import FeatureCard from "./FeatureCard";

const styles = () => ({
  loginLeftPart: {
    width: "60%",
    height: "initial",
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    backgroundImage: `url(./Images/right.jpg)`,
    backgroundSize: "cover",
  },
  loginImage: {
    width: "30rem",
    transition: "all 0.1s ease-in",
    "&:hover": { transform: "scale(1.05)" },
  },
  loginText: {
    color: "white",
    fontSize: "2.5rem",
  },
  subText: {
    color: "white",
    fontSize: "1.5rem",
  },
  featureContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    columnGap: "0.5rem",
    rowGap: "0.7rem",
    padding: "40px 0px 0px 0px",
  },
});

const LoginLeftComponent = ({ classes }) => {
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
  );
};

export default withStyles(styles)(LoginLeftComponent);
