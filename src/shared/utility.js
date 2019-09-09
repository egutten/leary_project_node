export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties
  };
};

export const checkValidation = (value, rules) => {
  let isValid = true;
  
  if (rules.required) {
    isValid = value.trim() !== '' && isValid; //trim removes white space at the beginning/end; prevents someone inputting blank spaces.
  }
  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid
  }
  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid
  }
  if ( rules.isEmail ) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test( value ) && isValid
  }
  if ( rules.isNumeric ) {
      const pattern = /^\d+$/;
      isValid = pattern.test( value ) && isValid
  }
  return isValid;
}
