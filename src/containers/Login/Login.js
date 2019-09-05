import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject, checkValidation} from '../../shared/utility';
import Button from '../../components/Button/Button';
import axios from 'axios';

class Login extends Component {
  state = {
    LoginForm: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false,
        label: 'Email',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false,
        label: 'Password',
      }
    }
  }
  
  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateObject(this.state.LoginForm, {
      [inputName]: updateObject(this.state.LoginForm[inputName], {
        value: event.target.value,
        valid: checkValidation(event.target.value, this.state.LoginForm[inputName].validation),
        touched: true
      })
    });
    this.setState({LoginForm: updatedForm});
  }
  
  // submitHandler = (event) => {
  //   event.preventDefault();
  //   axios.post("http://localhost:8080/api.json", {
  //     email: this.state.signUpForm.email.value,
  //     password: this.state.signUpForm.password.value,
  //     company_name: this.state.signUpForm.company_name.value
  //   })
  //   .then(response => {
  //     console.log(response);
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   });
  // };
  
  render() {
    const formElementsArray = [];
    for (let key in this.state.LoginForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.LoginForm[key]
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
        <h4>Login</h4>
        <form>
          {form}
          <Button clicked={this.submitHandler}>Submit</ Button>
        </form>
      </div>
    );
  }
}

export default Login;
