import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = (props) => (
  <ul>
    {props.isAuthenticated ? 
      <React.Fragment>
        <li><NavLink to="/logout">Logout</ NavLink></li>
        <li><NavLink to="/userpage">User Page</ NavLink></li>
        <li><NavLink to="/">Homepage</ NavLink></li> 
      </React.Fragment>
        : 
      <React.Fragment> 
        <li><NavLink to="/login">Login</ NavLink></li>
        <li><NavLink to="/signup">Sign Up</ NavLink></li>
      </React.Fragment>
    }  
  </ul>  
);


export default Navbar;
