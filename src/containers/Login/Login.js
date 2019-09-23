import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Input from '../../components/Input/Input';
import {updateObject, checkValidation} from '../../shared/utility';
import Button from '../../components/Button/Button';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class Login extends Component {
  state = {
    loginForm: {
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
    const updatedForm = updateObject(this.state.loginForm, {
      [inputName]: updateObject(this.state.loginForm[inputName], {
        value: event.target.value,
        valid: checkValidation(event.target.value, this.state.loginForm[inputName].validation),
        touched: true
      })
    });
    this.setState({loginForm: updatedForm});
  };
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.loginForm.email.value, this.state.loginForm.password.value)
  };
  
  render() {
    
    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to='/userpage' />
    }
    
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key, 
        config: this.state.loginForm[key]
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
        {authRedirect}
        <h4>Login</h4>
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
    isAuthenticated: state.userId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(actions.auth(email, password))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
