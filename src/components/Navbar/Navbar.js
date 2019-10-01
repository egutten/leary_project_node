import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css';


const Navbar = (props) => (
  <div className={classes.Navbar}>
    <img src={require("./img/lamp.png")}></img>
    <ul>
      {props.isAuthenticated ? 
        <React.Fragment>
          <li><NavLink to="/logout">Logout</ NavLink></li>
          <li><NavLink to="/messages">Messages</ NavLink></li>
          <li><NavLink to="/">Homepage</ NavLink></li> 
        </React.Fragment>
          : 
        <React.Fragment> 
          <li><NavLink to="/login">Login</ NavLink></li>
          <li><NavLink to="/signup">Sign Up</ NavLink></li>
        </React.Fragment>
      }  
    </ul>  
  </div>
);


export default Navbar;
