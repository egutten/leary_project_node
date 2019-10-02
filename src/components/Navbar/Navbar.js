import React from 'react';
import {NavLink} from 'react-router-dom';
import classes from './Navbar.module.css';


const Navbar = (props) => (
  <div className={classes.Navbar}>
    <div className={classes.Container}>
      <NavLink to="/">
        <img alt="leery-lamp" src={require("./img/lamp_2.png")}></img>
      </NavLink>
      <ul>
        {props.isAuthenticated ? 
          <React.Fragment>
            <li className={classes.Menu}><NavLink to="/messages">Messages</ NavLink></li>
            <li className={classes.Auth}><NavLink to="/logout">Logout</ NavLink></li> 
          </React.Fragment>
            : 
          <React.Fragment> 
            <li className={classes.Menu}><NavLink to="/login">Login</ NavLink></li>
            <li className={classes.Auth}><NavLink to="/signup">Sign Up</ NavLink></li>
          </React.Fragment>
        }  
      </ul> 
    </div>
     
  </div>
);


export default Navbar;
