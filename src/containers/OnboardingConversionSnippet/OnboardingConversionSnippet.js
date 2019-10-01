import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import  { renderConversionSnippet } from '../../shared/helperfunctions';
import SnippetBox from '../../components/snippetBox/snippetBox';
import classes from '../../hoc/Container/Container.module.css';
import * as actions from '../../store/actions';

class OnboardingConversionSnippet extends Component {  
  
  componentDidMount() {
    if (this.props.messages.length === 0) {
      this.props.getConversions(this.props.userId);
    }
  }

  nextHandler = (event) => {
    this.props.history.push('/messages');
  };
  
  backHandler = (event) => {
    this.props.history.push('/onboarding/conversions');
  };
  
  render() {  
    let snippetBox = null;
    if (this.props.messages.length > 0) {
      snippetBox = <SnippetBox snippet={renderConversionSnippet(this.props.userId, this.props.messages[0].position)} />
    }
    
    return (
      <div className={classes.formContainerWide}>
        <h2>Step 3: Insert Conversion Snippet</h2>
        <div className={classes.snippetBuffer}>
          {snippetBox}
        </div>
        <div className={classes.btnAlign}>
          <Button btnType="Nav" clicked={this.backHandler}>Back</ Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingConversionSnippet);
