import React from 'react';
import classes from './conversionCard.module.css';
import SnippetBox from '../../components/snippetBox/snippetBox';
import Button from '../../components/Button/Button';
import  { renderConversionSnippet, renderMessageSnippet } from '../../shared/helperfunctions';

const conversionCard = (props) => (
    
    <div className={(props.showSnippet ? classes.cardBoxWide : classes.cardBoxReg)}>
      <div>
        <p className={classes.eventText}>
          {props.conversionEvent}
          <span className={classes.smallText}>({props.position})</span>
        </p>
        <p className={classes.smallText}>Updated: {props.updated}</p>
        <p className={classes.smallText}>Created: {props.created}</p>
        <Button clicked={props.seeSnippet}>See Snippet</Button>
        {props.showSnippet ? 
          <React.Fragment>
            <SnippetBox snippet={renderMessageSnippet(props.userId, props.position)}/>
            <SnippetBox snippet={renderConversionSnippet(props.userId, props.conversionEventId)}/> 
          </React.Fragment>
          : null} 
      </div>
      <Button clicked={props.editMessage}>Edit Message</Button>
    </div>
    
);

export default conversionCard;
