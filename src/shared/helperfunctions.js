export const renderMessageSnippet = (props) => {
  return "<!-- Leery Message Snippet --><script>var s = document.createElement('script'); s.src = 'http://localhost:9000/widget.js'; s.id = '123456'; s.setAttribute('data-config', '{\"userId\": " + props.userId + ", \"position\": " + "\"" + props.position + "\"" + "}'); s.async = true; document.body.appendChild(s);</script>"
};

export const renderConversionSnippet = (props) => {
  return "<!-- Leery Conversion Snippet --><script>var s = document.createElement('script'); s.src = 'http://localhost:3030/conversion.js'; s.id = '123456'; s.setAttribute('data-config', '{\"email\": \"[CONFIGURE]\", \"first_name\": \"[CONFIGURE]\", \"last_name\": \"[CONFIGURE]\", \"company_name\": \"[CONFIGURE]\", \"conversion_event_id\": " + props.conversion_event_id + " \"user_id\": " + props.userId + "}'); s.async = true; document.body.appendChild(s);</script>"
};
