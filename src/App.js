import React, { Component } from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Logout from './containers/Logout/Logout';
import Messages from './containers/Messages/Messages';
import Placeholder from './containers/Placeholder';
import OnboardingMessageConfig from './containers/OnboardingMessageConfig/OnboardingMessageConfig';
import OnboardingMessageSnippet from './containers/OnboardingMessageSnippet/OnboardingMessageSnippet';
import OnboardingConversionSnippet from './containers/OnboardingConversionSnippet/OnboardingConversionSnippet';
import CreateMessage from './containers/CreateMessage/CreateMessage';
import EditMessage from './containers/EditMessage/EditMessage';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {connect} from 'react-redux';
import Container from './hoc/Container/Container';
import Background from './hoc/Background/Background';
import {withRouter} from 'react-router';

class App extends Component {
  
  state = {	
   path: this.props.history.location.pathname	
 }	

 componentDidMount() {	
   this.unlisten = this.props.history.listen((location, action) => {	
     this.setState({path: location.pathname});	
   });	
 }	

 componentWillUnmount() {	
   this.unlisten();	
 }
  
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
          <Route path = "/messages" exact component={Messages} />
          <Route path = "/messages/new" component={CreateMessage} />
          <Route path = "/messages/:id" component={EditMessage} />
        </Switch>
      );
    }
    
    let navbar = <Navbar isAuthenticated={this.props.isAuthenticated}/>	
    if (this.state.path === '/onboarding/conversions' || this.state.path === '/onboarding/message-snippet' || this.state.path === '/onboarding/conversion-snippet') {	
       navbar = null	
    }
    
    return (
      <React.Fragment> 
        <Background>
          {navbar}
          <Container>
            {routes}
          </Container>  
        </Background>
          <Footer/>
        
      </React.Fragment>   
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.userId !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
