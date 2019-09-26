import React from 'react';
import classes from './conversionCard.module.css'

const conversionCard = (props) => (
    <div className={classes.cardBox}>
      <p className={classes.eventText}>{props.conversionEvent}</p>
      <p className={classes.positionText}>{props.position}</p>
    </div>
);

export default conversionCard;
