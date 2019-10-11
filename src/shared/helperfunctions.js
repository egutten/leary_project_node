export const renderMessageSnippet = (userId, conversion_event_id) => {
  return "<!-- Leery Message Snippet --><script>var s = document.createElement('script'); s.src = 'https://getleery.com/widget.js'; s.id = '123456'; s.setAttribute('data-config', '{\"userId\": " + userId + "}'); s.async = true; document.body.appendChild(s);</script>"
};

export const renderConversionSnippet = (userId, conversion_event_id) => {
  return "<!-- Leery Conversion Snippet --><script>var s = document.createElement('script'); s.src = 'https://getleery.com/conversion.js'; s.id = '123456'; s.setAttribute('data-config', '{\"email\": \"[CONFIGURE]\", \"first_name\": \"[CONFIGURE]\", \"last_name\": \"[CONFIGURE]\", \"company_name\": \"[CONFIGURE]\", \"conversion_event_id\": " + conversion_event_id + ", \"user_id\": " + userId + "}'); s.async = true; document.body.appendChild(s);</script>"
};
