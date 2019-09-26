import React from 'react';
import classes from './conversionCard.module.css';
import SnippetBox from '../../components/snippetBox/snippetBox';
import  { renderConversionSnippet, renderMessageSnippet } from '../../shared/helperfunctions';

const conversionCard = (props) => (
    
    <div className={(props.showSnippet ? classes.cardBoxWide : classes.cardBoxReg)}>
      <p className={classes.eventText}>{props.conversionEvent}</p>
      <p className={classes.positionText}>{props.position}</p>
      <p>{props.timeStamp}</p>
      <button onClick={props.clicked}>See Snippet</button>
      {props.showSnippet ? <SnippetBox snippet={renderConversionSnippet(props.userId, props.conversionEventId)}/> : null} 
      {props.showSnippet ? <SnippetBox snippet={renderMessageSnippet(props.userId, props.position)}/> : null} 
    </div>
    
);

export default conversionCard;
