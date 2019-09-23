import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
// import  { renderMessageSnippet, renderConversionSnippet } from './helperfunctions';

class Snippet extends Component {
  
  submitHandler = (event) => {
    this.props.history.push('/userpage');
  };
  
  render() {
    
    // TODO: move snippet creation into own function (e.g. function that returns the string)
    // TODO: move to another file as a helper function (since it's used in multiple places)
    let messageSnippet = "<script>var s = document.createElement('script'); s.src = 'http://localhost:9000/widget.js'; s.id = '123456'; s.setAttribute('data-config', '{\"userId\": " + this.props.userId + ", \"position\": " + "\"" + this.props.position + "\"" + "}'); s.async = true; document.body.appendChild(s);</script>"
    
    let conversionSnippet = "<script>var s = document.createElement('script'); s.src = 'http://localhost:3030/conversion.js'; s.id = '123456'; s.setAttribute('data-config', '{\"email\": \"[CONFIGURE]\", \"first_name\": \"[CONFIGURE]\", \"last_name\": \"[CONFIGURE]\", \"company_name\": \"[CONFIGURE]\", \"conversion_event_id\": " + this.props.conversion_event_id + ", \"user_id\": " + this.props.userId + "}'); s.async = true; document.body.appendChild(s);</script>"
    
    return (
      
      <div>
        <h4>Step 2: Insert Snippet Into Code</h4>
        <div>
          <p>{messageSnippet}</p>
          <p>{conversionSnippet}</p>
        </div>
        <Button clicked={this.submitHandler}>Next</ Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    userId: state.userId,
    conversion_event_id: state.conversion_event_id
  };
};

export default connect(mapStateToProps)(Snippet);
