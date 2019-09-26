import React from 'react';
import classes from './conversionCard.module.css';
import SnippetBox from '../../components/snippetBox/snippetBox';

const conversionCard = (props) => (

    <div className={classes.cardBox}>
      <p className={classes.eventText}>{props.conversionEvent}</p>
      <p className={classes.positionText}>{props.position}</p>
      <p>{props.timeStamp}</p>
      <button onClick={props.clicked}>See Snippet</button>
      {props.showSnippet ? <SnippetBox snippet={props.snippet}/> : null} 
    </div>
);

export default conversionCard;
