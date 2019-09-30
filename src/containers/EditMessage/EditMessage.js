import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import Radio from '../../components/Radio/Radio';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import MessageSimulation from  '../../components/messageSimulation/messageSimulation';

class EditMessage extends Component {
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
        checked: false
      },
      position_left: {
        value: 'left',
        text: 'Left',
        checked: false
      }  
    }  
  }  
  
  //pre-fill edit form with data from message selected
  componentDidMount() { 
    const messages = this.props.messages;
    const id = Number(this.props.match.params.id);
    const editMessage = messages.filter(message => message.id === id);
    console.log(editMessage[0].position === 'right');
    const updatedForm = updateObject(this.state.configForm, {
      conversion_event: updateObject(this.state.configForm.conversion_event, {
        value: editMessage[0].conversion_event
      })
    });
    const updatedRadio = updateObject(this.state.radio, {
      position_right: updateObject(this.state.radio.position_right, {
        checked: editMessage[0].position === 'right' ? true : false
      }),
      position_left: updateObject(this.state.radio.position_left, {
        checked: editMessage[0].position === 'left' ? true : false
      })
    });
    this.setState({
      configForm: updatedForm,
      radio: updatedRadio
    });
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
    this.props.createUpdateConversion(this.state.configForm.conversion_event.value, this.props.userId, document.querySelector('input[name="position"]:checked').value, this.props.match.params.id);
    this.props.history.push('/messages');
  };
  
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
        clicked={(event) => this.radioHandler(event, radioButton.id)}
      /> 
    ));
    
    return (
      <div>
        <h4>Edit Message</h4>
        <MessageSimulation conversionEvent={this.state.configForm.conversion_event.value} />
        <form>
          {form}
          {radio}
          <Button clicked={this.submitHandler}>Save</ Button>
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
    createUpdateConversion: (conversion_event, userId, position, conversion_event_id) => dispatch(actions.createUpdateConversion(conversion_event, userId, position, conversion_event_id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditMessage);
