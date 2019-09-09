import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import axios from 'axios';
import {connect} from 'react-redux';

class ConversionEventConfig extends Component {
  state = {
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
    userId: null
  }
  
  componentDidMount() {
    axios.post("http://localhost:8080/user", {
        email: this.props.email
    })
      .then(res => 
        this.setState({userId: res.data[0].id})
      )
      .catch(err => 
        console.log(err)
    );
  };
  
  inputChangedHandler = (event) => {
    const updatedConfig = updateObject(this.state.conversion_event, {
        value: event.target.value
      });
      this.setState({conversion_event: updatedConfig});
    };  
  
  submitHandler = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/ce", {
      conversion_event: this.state.conversion_event.value,
      user_id: this.state.userId
    })
    .then(response => {
      this.props.history.push('/');
    })
    .catch(err => {
      console.log(err.message);
    });
  };
  
  render() {
    return (
      <div>
        <h4>Step 1: Configure Messages</h4>
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

const mapStateToProps = state => {
  return {
    email: state.email
  };
};

export default connect(mapStateToProps)(ConversionEventConfig);
