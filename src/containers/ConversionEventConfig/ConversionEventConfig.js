import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import axios from 'axios';

class ConversionEventConfig extends Component {
  state = {
    conversion_event: {
      elementType: 'select',
      elementConfig: {
        options: [
        {value: 'trial', displayValue: 'Just signed-up for a trial'},
        {value: 'demo', displayValue: 'Just signed-up for a demo'}
        ]
      },
      value: 'trial'
    }  
  }
  
  inputChangedHandler = (event) => {
    const updatedConfig = updateObject(this.state.conversion_event, {
        value: event.target.value
      });
      this.setState({conversion_event: updatedConfig});
    };  
  
  submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/ce", {
      conversion_event: this.state.conversion_event.displayValue
    })
    .then(response => {
      console.log(response);
      this.props.history.push('/');
    })
    .catch(err => {
      console.log(err.message);
    });
  };
  
  render() {
    return (
      <div>
        <h4>Sign Up</h4>
        <form>
          <Input 
            elementType={this.state.conversion_event.elementType}
            elementConfig={this.state.conversion_event.elementConfig}
            value={this.state.conversion_event.value}
            changed={(event) => this.inputChangedHandler(event)} />
          <Button clicked={this.submitHandler}>Submit</ Button>
        </form>
      </div>
    );
  }
}

export default ConversionEventConfig;
