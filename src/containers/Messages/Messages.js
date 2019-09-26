import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import ConversionCard from '../../components/conversionCard/conversionCard';

const moment = require("moment");


class Messages extends Component { 
  
  submitHandler = (event) => {
    event.preventDefault();
    this.props.history.push('/create-message');
  };
  
  snippetHandler = (event, id) => {
    this.props.messages.find((o, i) => {
      if (o.id === id) {
        this.setState({showSnippet: true});
      }
    })
  }
  
  componentDidMount() {
    this.props.getConversions(this.props.userId);
  }
  
  render() {

    let messages = this.props.messages.map(message => (      
      <ConversionCard key={message.id} conversionEvent={message.conversion_event} position={message.position} timeStamp={moment(message.createdAt).format("LLL")} clicked={(event) => this.snippetHandler(event, message.id)} />
    ));
  
    return (
      <div>
        <h4>Conversions</h4>
        {messages}
        <Button clicked={this.submitHandler}>Add Message</ Button>
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
