import React, { Component } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Placeholder from './containers/Placeholder';
import ConversionEventConfig from './containers/ConversionEventConfig/ConversionEventConfig'
import Navbar from './components/Navbar/Navbar';
import {connect} from 'react-redux';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

var cookieJar = cookies.get('sessionId');

class App extends Component {
  
  render() {
    
    console.log(this.props.isAuthenticated);
    console.log(cookieJar);
    
    let routes = (
      <Switch>
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
        <Redirect to="/login" />
      </Switch>
    );
    
    if (this.props.isAuthenticated || cookieJar !== undefined) {
      routes = (
        <Switch>
          <Route path = "/logout" component={Logout} />
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path = "/convconfig" component={ConversionEventConfig} />
          <Route path = "/" component={Placeholder} />
        </Switch>
      );
    }
    
    return (
      <React.Fragment> 
        <Navbar isAuthenticated={this.props.isAuthenticated} cookiePresent={cookieJar !== undefined}/>
        {routes}
      </React.Fragment>   
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.loggedIn !== undefined
  };
};

export default connect(mapStateToProps)(App);
