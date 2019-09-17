import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar = (props) => (
  <ul>
    {props.isAuthenticated || props.cookiePresent ? 
      <React.Fragment>
        <li><NavLink to="/logout">Logout</ NavLink></li>
        <li><NavLink to="/">Secret Page</ NavLink></li> 
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
