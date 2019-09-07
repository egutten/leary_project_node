import React, { Component } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Placeholder from './containers/Placeholder';
import ConversionEventConfig from './containers/ConversionEventConfig/ConversionEventConfig'
// import axios from 'axios';
import Navbar from './components/Navbar/Navbar';
import {connect} from 'react-redux';

class App extends Component {
  
  // componentDidMount() {
  //   axios.get("http://localhost:8080/api")
  //     .then(res => console.log(res))
  //     .catch(err => console.log(err));
  // };
  
  render() {
    
    console.log(this.props.isAuthenticated);
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
        <Redirect to="/login" />
      </Switch>
    );
    
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path = "/logout" component={Logout} />
          <Route path = "/convconfig" component={ConversionEventConfig} />
          <Route path = "/" component={Placeholder} />
        </Switch>
      );
    }
    
    return (
      <React.Fragment> 
        <Navbar isAuthenticated={this.props.isAuthenticated}/>
        {routes}
      </React.Fragment>   
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.sessionId !== null
  };
};

export default connect(mapStateToProps)(App);
