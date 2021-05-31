import React from "react";
import classes from "./components.module.css";

function Loader(props) {
    return (
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
    );
}

export default Loader;