import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';

class UserPage extends Component {
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
        text: 'Right'
      },
      position_left: {
        elementType: 'radio',
        value: 'left',
        text: 'Left'
      }
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
    this.props.getConversionId(this.state.configForm.conversion_event.value, this.props.userId);
    this.props.savePosition(document.querySelector('input[name="position"]:checked').value);
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
        text={formElement.config.text} />
    ));
    
    let messageSnippet = "<script>var s = document.createElement('script'); s.src = 'http://localhost:9000/widget.js'; s.id = '123456'; s.setAttribute('data-config', '{\"userId\": " + this.props.userId + ", \"position\": " + "\"" + this.props.position + "\"" + "}'); s.async = true; document.body.appendChild(s);</script>"
    
    let conversionSnippet = "<script>var s = document.createElement('script'); s.src = 'http://localhost:3030/conversion.js'; s.id = '123456'; s.setAttribute('data-config', '{\"email\": \"[CONFIGURE]\", \"first_name\": \"[CONFIGURE]\", \"last_name\": \"[CONFIGURE]\", \"company_name\": \"[CONFIGURE]\", \"conversion_event_id\": " + this.props.conversion_event_id + ", \"user_id\": " + this.props.userId + "}'); s.async = true; document.body.appendChild(s);</script>"
    
    return (
      <div>
        <h4>User Page</h4>
        {form}
        <Button clicked={this.submitHandler}>Submit</ Button>
        <div>
          <p>{messageSnippet}</p>
          <p>{conversionSnippet}</p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    position: state.position,
    userId: state.userId,
    conversion_event_id: state.conversion_event_id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    savePosition: (position) => dispatch(actions.savePosition(position)),
    getConversionId: (conversion_event, userId) => dispatch(actions.getConversionId(conversion_event, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
