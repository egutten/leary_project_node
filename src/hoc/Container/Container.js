import React from 'react';
import classes from './Container.module.css';

const container = (props) => (
  <div className={classes.Container}>
    {props.children}
  </div>
);


export default container;
