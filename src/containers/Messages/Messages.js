import React, {Component} from 'react';
import Input from '../../components/Input/Input';
import {updateObject} from '../../shared/utility';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import ConversionCard from '../../components/conversionCard/conversionCard';


class Messages extends Component { 
  
  submitHandler = (event) => {
    event.preventDefault();
  };
  
  componentDidMount() {
    this.props.getConversions(this.props.userId);
    console.log(this.props.messages);
  }

  // for (i=0; i < this.props.messages.length; i++) {
  //   <ConversionCard conversionEvent={this.props.messages[i].conversion_event} position={this.props.messages[i].position} />
  // }
  
  render() {
    return (
      <div>
        <h4>Conversions</h4>
      
        <Button clicked={this.submitHandler}>Submit</ Button>
        <div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: [],
    userId: state.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConversions: (userId) => dispatch(actions.getConversions(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
