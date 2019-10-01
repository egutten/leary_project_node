import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import  { renderConversionSnippet } from '../../shared/helperfunctions';
import SnippetBox from '../../components/snippetBox/snippetBox';

class OnboardingConversionSnippet extends Component {  
  
  submitHandler = (event) => {
    this.props.history.push('/messages');
  };
  
  render() {
    
    return (
      
      <div>
        <h2>Step 3: Insert Snippet Into Code</h2>
        <div>
          <SnippetBox snippet={renderConversionSnippet(this.props.userId, this.props.messages[0].id)} />
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
