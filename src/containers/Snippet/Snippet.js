import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import  { renderMessageSnippet, renderConversionSnippet } from '../../shared/helperfunctions';

class Snippet extends Component {
  
  submitHandler = (event) => {
    this.props.history.push('/conversions');
  };
  
  render() {
    
    const props = {
      userId: this.props.userId,
      position: this.props.position,
      conversion_event_id: this.props.conversion_event_id
    }
    
    return (
      
      <div>
        <h4>Step 2: Insert Snippet Into Code</h4>
        <div>
          <p>{renderMessageSnippet(props)}</p>
          <p>{renderConversionSnippet(props)}</p>
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
