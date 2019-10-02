import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import  { renderMessageSnippet } from '../../shared/helperfunctions';
import SnippetBox from '../../components/snippetBox/snippetBox';
import classes from '../../hoc/Container/Container.module.css';
import * as actions from '../../store/actions';

class OnboardingMessageSnippet extends Component {  
  
  componentDidMount() {
    if (this.props.messages.length === 0) {
      this.props.getConversions(this.props.userId);
    }
  }
  
  nextHandler = (event) => {
    this.props.history.push('/onboarding/conversion-snippet');
  };
  
  render() {
    let snippetBox = null;
    if (this.props.messages.length > 0) {
      snippetBox = <SnippetBox boxSize="snippetBoxMed" snippet={renderMessageSnippet(this.props.userId, this.props.messages[0].position)} />
    }
    
    return (
      <div className={classes.formContainerWide}>
        <h2>Step 2: Insert Message Snippet</h2>
        <p>Copy the snippet below and paste it in the body of the page on which you would like to see the message appear.</p>
        <p><u>Remember</u>: You will be able to access this snippet and edit your Message on your Messages page.</p>
        <div className={classes.snippetBuffer}>
          {snippetBox}
        </div>
        <div className={classes.btnAlignRight}>
          <Button btnType="Nav" clicked={this.nextHandler}>Next</ Button>
        </div>
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

const mapDispatchToProps = dispatch => {
  return {
    getConversions: (userId) => dispatch(actions.getConversions(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingMessageSnippet);
