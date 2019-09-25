import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import  { renderConversionSnippet } from '../../shared/helperfunctions';
import SnippetBox from '../../components/snippetBox/snippetBox';

class OnboardingConversionSnippet extends Component {  
  
  submitHandler = (event) => {
    this.props.history.push('/onboarding/conversion-snippet');
  };
  
  render() {
    
    const props = {
      userId: this.props.userId,
      conversion_event_id: this.props.messages[0].id
    }
    
    return (
      
      <div>
        <h4>Step 2: Insert Snippet Into Code</h4>
        <div>
          <SnippetBox snippet={renderConversionSnippet(props)} />
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

export default connect(mapStateToProps)(OnboardingConversionSnippet);
