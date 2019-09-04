import React, { Component } from "react";
import {Route, Switch} from 'react-router-dom';
import SignUp from './containers/SignUp/SignUp';
import Placeholder from './containers/Placeholder';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch("http://localhost:8080/api.json")
      .then(res => res.json())
      .then(res => this.setState({ data: res }))
      .catch(err => console.log(err));
  }
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Placeholder} />
        <Route path="/signup" component={SignUp}/>
      </Switch>
    );
  }
}

export default App;
