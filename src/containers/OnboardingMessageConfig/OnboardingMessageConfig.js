import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import MessageSimulation from  '../../components/messageSimulation/messageSimulation';

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
      },
      position_right: {
        elementType: 'radio',
        value: 'right',
        text: 'Right',
        checked: true
      },
      position_left: {
        elementType: 'radio',
        value: 'left',
        text: 'Left',
        checked: false
      }
    }  
  }
  
  componentDidMount() {
    //functionality to allow selection of either radio button
    const radio = document.querySelectorAll('input[name="position"]');
    for(var i = 0; i < radio.length; i++) {
      radio[i].addEventListener('click', () => {
        const updatedForm = updateObject(this.state.configForm, {
          position_right: updateObject(this.state.configForm.position_right, {
            checked: !this.state.configForm.position_right.checked
          }),
          position_left: updateObject(this.state.configForm.position_left, {
            checked: !this.state.configForm.position_left.checked
          })
        });
        this.setState({configForm: updatedForm});  
      });
    }
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
        text={formElement.config.text}
        checked={formElement.config.checked} />
    ));
    
    return (
      <div>
        <h4>Step 1: Configure Messages</h4>
        <MessageSimulation conversionEvent={this.state.configForm.conversion_event.value} />
        <form>
          {form}
          <Button clicked={this.submitHandler}>Submit</ Button>
        </form>
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
