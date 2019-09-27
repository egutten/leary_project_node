import {updateObject} from './utility';

export const renderMessageSnippet = (userId, position, conversion_event_id) => {
  return "<!-- Leery Message Snippet --><script>var s = document.createElement('script'); s.src = 'http://localhost:9000/widget.js'; s.id = '123456'; s.setAttribute('data-config', '{\"userId\": " + userId + ", \"position\": " + "\"" + position + "\"" + "}'); s.async = true; document.body.appendChild(s);</script>"
};

export const renderConversionSnippet = (userId, conversion_event_id) => {
  return "<!-- Leery Conversion Snippet --><script>var s = document.createElement('script'); s.src = 'http://localhost:3030/conversion.js'; s.id = '123456'; s.setAttribute('data-config', '{\"email\": \"[CONFIGURE]\", \"first_name\": \"[CONFIGURE]\", \"last_name\": \"[CONFIGURE]\", \"company_name\": \"[CONFIGURE]\", \"conversion_event_id\": " + conversion_event_id + " \"user_id\": " + userId + "}'); s.async = true; document.body.appendChild(s);</script>"
};

export const radioSwitchFunctionality = (formData) => {
  const radio = document.querySelectorAll('input[name="position"]');
  for(var i = 0; i < radio.length; i++) {
    radio[i].addEventListener('click', () => {
      const updatedForm = updateObject(formData.configForm, {
        position_right: updateObject(formData.positionRight, {
          checked: !formData.positionRight.checked
        }),
        position_left: updateObject(formData.positionLeft, {
          checked: !formData.positionLeft.checked
        })
      });
      return updatedForm  
    });
  }
}
