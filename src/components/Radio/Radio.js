import React from 'react';

const radio = (props) => (
  <div>
    <input 
      name="position"
      type="radio"
      className="position"
      value={props.value}
      checked={props.checked}
      onChange={props.changed}
    />
  <span>{props.text}</span>
 </div>
);

export default radio;
