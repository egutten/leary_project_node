import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import Radio from '../../components/Radio/Radio';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import MessageSimulation from  '../../components/messageSimulation/messageSimulation';
import classes from '../../hoc/Container/Container.module.css';

class OnboardingMessageConfig extends Component {
  state = {
    configForm: {
      conversion_event: {
        elementType: 'select',
        elementConfig: {
          options: [
          {value: 'Just signed-up for a trial', displayValue: 'Just signed-up for a trial'},
          {value: 'Just signed-up for a demo', displayValue: 'Just signed-up for a demo'}
          ]
        },
        value: 'Just signed-up for a trial'
      }
    },
    radio: {
      position_right: {
        value: 'right',
        text: 'Right',
        checked: true
      },
      position_left: {
        value: 'left',
        text: 'Left',
        checked: false
      }  
    }  
  }
  
  radioHandler = () => {
    const updatedRadio = updateObject(this.state.radio, {
      position_right: updateObject(this.state.radio.position_right, {
        checked: !this.state.radio.position_right.checked
      }),
      position_left: updateObject(this.state.radio.position_left, {
        checked: !this.state.radio.position_left.checked
      })
    });
    this.setState({radio: updatedRadio});
  }
  
  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateObject(this.state.configForm, {
      [inputName]: updateObject(this.state.configForm[inputName], {
        value: event.target.value
      })
    });
    this.setState({configForm: updatedForm});
  };  
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.createUpdateConversion(this.state.configForm.conversion_event.value, this.props.userId, document.querySelector('input[name="position"]:checked').value);
  };
  
  //only allow routing to snippet page after state updates, so snippet is properly populated
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.messages.length !== 0) {
      nextProps.history.push('/onboarding/message-snippet');
    }
    return nextProps;
  }
  
  render() {
    
    const formElementsArray = [];
    for (let key in this.state.configForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.configForm[key]
      });
    }
    
    let form = formElementsArray.map(formElement => (
      <Input 
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    
    const radioArray = [];
    for (let key in this.state.radio) {
      radioArray.push({
        id: key,
        config: this.state.radio[key]
      });
    }
    
    let radio = radioArray.map(radioButton => (
      <Radio 
        key={radioButton.id}
        value={radioButton.config.value} 
        text={radioButton.config.text} 
        checked={radioButton.config.checked} 
        changed={(event) => this.radioHandler(event, radioButton.id)}
      /> 
    ));
    
    return (
      <div>
        <h2>Step 1: Configure Messages</h2>
        <div className={classes.centerContainer}>
          <MessageSimulation conversionEvent={this.state.configForm.conversion_event.value} />
          <form>
            {form}
            <div className={classes.radioContainer}>
              <p>Message position:</p>
              {radio}
            </div>
          </form>
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

const mapDispatchToProps = dispatch => {
  return {
    createUpdateConversion: (conversion_event, userId, position) => dispatch(actions.createUpdateConversion(conversion_event, userId, position))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OnboardingMessageConfig);
