import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Login from './containers/Login/Login';
import Placeholder from './containers/Placeholder';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/api")
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };
  
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Placeholder} />
        <Route path="/signup" component={SignUp}/>
        <Route path="/login" component={Login}/>
      </Switch>
    );
  }
}

export default App;
