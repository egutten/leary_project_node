import React, { Component } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import UserPage from './containers/UserPage/UserPage';
import Placeholder from './containers/Placeholder';
import OnboardingMessageConfig from './containers/OnboardingMessageConfig/OnboardingMessageConfig';
import OnboardingMessageSnippet from './containers/OnboardingMessageSnippet/OnboardingMessageSnippet';
import OnboardingConversionSnippet from './containers/OnboardingConversionSnippet/OnboardingConversionSnippet';
import Navbar from './components/Navbar/Navbar';
import {connect} from 'react-redux';

class App extends Component {
  
  render() {
    
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
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={SignUp}/>
          <Route path = "/onboarding/conversions" component={OnboardingMessageConfig} />
          <Route path = "/onboarding/message-snippet" component={OnboardingMessageSnippet} />
          <Route path = "/onboarding/conversion-snippet" component={OnboardingConversionSnippet} />
          <Route path = "/conversions" component={UserPage} />
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
    isAuthenticated: state.userId !== null
  };
};

export default connect(mapStateToProps)(App);
