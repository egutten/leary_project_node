import React from 'react';
import classes from './messageSimulation.module.css'

const messageSimulation = (props) => (
    <div className={classes.messageBox}>
      <div className={classes.logo}>
      </div>
      <div className={classes.messageText}>
        <p className={classes.eventText}>{props.conversionEvent}</p>
        <p className={classes.timeStamp}>2 seconds ago</p>
      </div>
    </div>
);

export default messageSimulation;
