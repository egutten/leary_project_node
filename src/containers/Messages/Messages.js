import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import ConversionCard from '../../components/conversionCard/conversionCard';

const moment = require("moment");

class Messages extends Component { 
  
  state ={
    showSnippet: 0
  }
  
  createHandler = (event) => {
    this.props.history.push('/create-message');
  };
  
  editHandler = (event, id) => {
    this.props.history.push('/messages/' + id);
  }
  
  snippetHandler = (event, id) => {
    this.props.messages.find((o, i) => {
      if (o.id === id) {
        this.setState({showSnippet: id});
      } 
    });
    if (this.state.showSnippet !== 0) {
      this.setState({showSnippet: 0})
    }
  };
  
  componentDidMount() {
    this.props.getConversions(this.props.userId);
  };
  
  render() {
    let messages = this.props.messages.map(message => (  
      <ConversionCard 
        key={message.id} 
        conversionEvent={message.conversion_event} 
        position={message.position} 
        updated={moment(message.updatedAt).format("LLL")}
        created={moment(message.createdAt).format("LLL")} 
        seeSnippet={(event) => this.snippetHandler(event, message.id)} 
        editMessage={(event) => this.editHandler(event, message.id)} 
        userId={this.props.userId} 
        conversionEventId={message.id}
        showSnippet={this.state.showSnippet === message.id} />
    ));
  
    return (
      <div>
        <h4>Messages</h4>
        {messages}
        <Button clicked={this.createHandler}>Add Message</ Button>
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
