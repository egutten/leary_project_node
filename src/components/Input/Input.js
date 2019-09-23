import React from 'react';
import classes from './Input.module.css'

const input = (props) => {
    let inputElement = null;
    const inputClasses = [classes.InputElement];
    let validationError = null;
    
    if (props.invalid && props.shouldValidate && props.touched) {
      inputClasses.push(classes.Invalid);
      validationError = <p className={classes.ValidationError}>Please enter a valid {props.label}!</p>;
    }
  
    switch (props.elementType) {
      case ('input'):
        inputElement = <input 
          className={inputClasses.join(' ')} 
          {...props.elementConfig} 
          value={props.value}
          onChange={props.changed}/>;
        break;
      case ('select'):
        inputElement = (  
          <select 
            className={inputClasses.join(' ')} 
            value={props.value}
            onChange={props.changed}>
            {props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayValue}
              </option>
            ))}
          </select>
        );
       break;  
      case ('radio'):
        inputElement = 
        <div>
          <input 
            name="position"
            type={props.elementType}
            className="position"
            value={props.value}
            onChange={props.changed}
          />
        <span>{props.text}</span>
       </div>
        break;
      default:
        inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value}
        onChange={props.changed}/>
    }
  
    return (
      <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {inputElement}
        {validationError}
      </div>
    );
};

export default input;
