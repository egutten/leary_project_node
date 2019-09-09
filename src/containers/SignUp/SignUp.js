import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../../components/Input/Input';
import {updateObject, checkValidation} from '../../shared/utility';
import Button from '../../components/Button/Button';
import axios from 'axios';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class SignUp extends Component {
  state = {
    signUpForm: {
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
      },
      company_name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Company Name'
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        label: 'Company Name'
      }
    },
  }
  
  inputChangedHandler = (event, inputName) => {
    const updatedForm = updateObject(this.state.signUpForm, {
      [inputName]: updateObject(this.state.signUpForm[inputName], {
        value: event.target.value,
        valid: checkValidation(event.target.value, this.state.signUpForm[inputName].validation),
        touched: true
      })
    });
    this.setState({signUpForm: updatedForm});
  }
  
  submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/signup", {
      email: this.state.signUpForm.email.value,
      password: this.state.signUpForm.password.value,
      company_name: this.state.signUpForm.company_name.value
    })
    .then(response => {
      console.log(response);
      this.props.onAuth(this.state.signUpForm.email.value, this.state.signUpForm.password.value);
    })
    .catch(err => {
      console.log(err.message);
    });
  };
  
  render() {
    
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to='/convconfig' />
    }
    
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
    
    console.log(this.props.isAuthenticated);
    
    if (this.props.isAuthenticated) {
      this.props.history.push("/convconfig");
    }

    return (
      <div>
        {authRedirect}
        <h4>Sign Up</h4>
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
    isAuthenticated: state.sessionId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return{
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
