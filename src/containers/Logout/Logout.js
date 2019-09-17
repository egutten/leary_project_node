import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import * as actions from '../../store/actions';
import {connect} from 'react-redux';

class Logout extends Component {
  
  componentDidMount () {
    this.props.onLogout();
  }
  
  render() {
    let authRedirect = null;
    if (!this.props.isAuthenticated) {
      authRedirect = <Redirect to='/login' />
    }
    
    return (
      <div>
        {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.loggedIn !== undefined
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
