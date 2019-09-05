import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject, checkValidation} from '../../shared/utility';
import Button from '../../components/Button/Button';
import axios from 'axios';

class ConversionEventConfig extends Component {
  state = {
    conversion_event: {
      elementType: 'select',
      elementConfig: {
        options: [
        {value: 'Just signed-up for a trial'}
        {value: 'Just signed-up for a demo'}
        ]
      },
      value: 'Just signed-up for a trial'
    }  
  }
  
  inputChangedHandler = (event, inputName) => {
    const updatedConfig = updateObject(this.state.conversion_event, {
        value: event.target.value)
      });
    });
    this.setState({text: updatedConfig});
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/ce", {
      conversion_event: this.state.signUpForm.email.value,
      
    })
    .then(response => {
      console.log(response);
      if (response.data.errors.length < 0) {
        this.props.history.push('/');
      }  
    })
    .catch(err => {
      console.log(err.message);
    });
  };
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.signUpForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.signUpForm[key]
      });
    }
    
    let form = formElementsArray.map(formElement => (
      <Input 
        key={formElement.id}
        label={formElement.config.label}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
    ));

    return (
      <div>
        <h4>Sign Up</h4>
        <form>
          {form}
          <Button clicked={this.submitHandler}>Submit</ Button>
        </form>
      </div>
    );
  }
}

export default SignUp;
