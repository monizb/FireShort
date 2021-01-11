import { Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

import FeatureCard from "./FeatureCard";

const styles = () => ({
  loginLeftPart: {
    width: "60%",
    height: "initial",
    marginTop:"200px",
    padding: "50px 50px",
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
    width: "50%",
    
    alignItems: "center",
    colorEffect:"grey",
    
    marginTop:"20px",
    marginRight:"300px",
    marginBottom:"30px"
  },
 "@media (max-width: 820px)":{
    loginLeftPart: {
      transform:"translateX(0px)",
      width:"200px"
    }    
 }
});

const LoginLeftComponent = ({ classes }) => {
  return (
    <Grid item className={classes.loginLeftPart}>
      
      <div className={classes.featureContainer}>
        <FeatureCard feature="Custom Tiny URLs" />
        <FeatureCard feature="Hit Tracker" />
        <FeatureCard feature="Admin Panel" />
        <FeatureCard feature="Password Protected URLs" />
      </div>
      <img
        className={classes.loginImage}
        src="./images/login.svg"
        alt="Login Welcome"
      />
    </Grid>
  );
};

export default withStyles(styles)(LoginLeftComponent);
