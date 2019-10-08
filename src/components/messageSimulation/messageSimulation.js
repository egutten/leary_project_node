import React from 'react';
import classes from './messageSimulation.module.css'

const messageSimulation = (props) => (
    <div className={classes.messageBox}>
      <img alt="leery-logo" src={require("./img/google.png")} className={classes.logo}/>
      <div className={classes.messageText}>
        <p className={classes.eventText}>{props.conversionEvent}</p>
        <p className={classes.timeStamp}>2 seconds ago</p>
      </div>
    </div>
);

export default messageSimulation;
