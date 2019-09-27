import React from 'react';
import classes from './snippetBox.module.css'

const snippetBox = (props) => (
    <div className={classes.snippetBox}>
      <p className={classes.snippetText}>{props.snippet}</p>
    </div>
);

export default snippetBox;
