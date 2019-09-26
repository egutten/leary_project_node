import React, {Component} from 'react';
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

  }


  
  render() {
    
    
    let messages = this.props.messages.map(message => (
      <ConversionCard key={message.id} conversionEvent={message.conversion_event} position={message.position} />
    ));
  
    return (
      <div>
        <h4>Conversions</h4>
        {messages}
        <Button clicked={this.submitHandler}>Submit</ Button>
        <div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    messages: state.messages,
    userId: state.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getConversions: (userId) => dispatch(actions.getConversions(userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
