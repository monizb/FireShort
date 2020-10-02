import { Card, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import React from "react";

const styles = () => ({
  root: {
    textAlign: "center",
    padding: "0.6rem 1rem",
    backgroundColor: "rgb(20, 20, 20)",
    color: "white",
    transition: "all 0.1s ease-in",
    "&:hover": {
      transform: "scale(1.1)",
    },
  },
  featureText: {
    cursor: "default",
  },
});

const FeatureCard = ({ feature = "", classes }) => {
  return (
    <Card variant="outlined" className={classes.root}>
      <Typography className={classes.featureText}>{feature}</Typography>
    </Card>
  );
};

export default withStyles(styles)(FeatureCard);
