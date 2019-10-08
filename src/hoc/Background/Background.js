import React from 'react';
import classes from './Background.module.css';

const background = (props) => (
  <div className={classes.Background}>
    {props.children}
  </div>
);


export default background;
