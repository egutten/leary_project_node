import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';
import * as actions from '../../store/actions';
import ConversionCard from '../../components/conversionCard/conversionCard';
import classes from '../../hoc/Container/Container.module.css';

const moment = require("moment");

class Messages extends Component { 
  
  state ={
    showSnippet: 0
  }
  
  createHandler = (event) => {
    this.props.history.push('/messages/new');
  };
  
  editHandler = (event, id) => {
    this.props.history.push('/messages/' + id);
  }
  
  deleteHandler = (event, id) => {
    this.props.deleteConversions(id, this.props.userId);
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
        seeSnippet={(event) => this.snippetHandler(event, message.id)} 
        editMessage={(event) => this.editHandler(event, message.id)} 
        deleteMessage={(event) => this.deleteHandler(event, message.id)} 
        userId={this.props.userId} 
        conversionEventId={message.id}
        showSnippet={this.state.showSnippet === message.id} />
    ));
  
    return (
      <div className={classes.formContainerWide}>
        <h2>Messages</h2>
        {messages}
        <Button clicked={this.createHandler} btnType="Add">
          <div className={classes.addMessage}>+</div>
          <p>Add Message</p>
        </Button>
        
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
    getConversions: (userId) => dispatch(actions.getConversions(userId)),
    deleteConversions: (messageId, userId) => dispatch(actions.deleteConversions(messageId, userId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
