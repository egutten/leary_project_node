import React, {Component} from 'react';
import Button from '../../components/Button/Button';
import {connect} from 'react-redux';

class Snippet extends Component {
  
  submitHandler = (event) => {
    this.props.history.push('/');
  };
  
  render() {
    
    let snippet1 = "<script>var s = document.createElement('script'); s.src = 'http://localhost:9000/widget.js'; s.id = '123456'; s.setAttribute('data-config', '{'userId':" + " " + this.props.userId + ", 'position':" + " " + "'" + this.props.position + "'" + "}'); s.async = true; document.body.appendChild(s);</script>"
    
    let snippet2 = "<script>var s = document.createElement('script'); s.src = 'http://localhost:3030/conversion.js'; s.id = '123456'; s.setAttribute('data-config', '{'email': [CONFIGURE], 'first_name': [CONFIGURE], 'last_name': [CONFIGURE], 'company_name': [CONFIGURE], 'conversion_event_id':" + " " + this.props.conversion_event_id + " 'user_id':" + " " + this.props.userId + "}'); s.async = true; document.body.appendChild(s);</script>"
    
    return (
      <div>
        <h4>Step 2: Insert Snippet Into Code</h4>
        <div>
          <p>{snippet1}</p>
          <p>{snippet2}</p>
        </div>
        <Button clicked={this.submitHandler}>Submit</ Button>
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

export default connect(mapStateToProps)(Snippet);
