import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import  { renderMessageSnippet, renderConversionSnippet } from '../../shared/helperfunctions';
import SnippetBox from '../../components/snippetBox/snippetBox';

class OnboardingMessageSnippet extends Component {  
  
  submitHandler = (event) => {
    this.props.history.push('/conversions');
  };
  
  render() {
    
    const props = {
      userId: this.props.userId,
      position: this.props.messages[0].position,
      conversion_event_id: this.props.messages[0].id
    }
    
    return (
      
      <div>
        <h4>Step 2: Insert Snippet Into Code</h4>
        <div>
          <SnippetBox snippet={renderMessageSnippet(props)} />
        </div>
        <Button clicked={this.submitHandler}>Next</ Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    userId: state.userId,
    messages: state.messages
  };
};

export default connect(mapStateToProps)(OnboardingMessageSnippet);
