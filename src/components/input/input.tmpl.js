export default `
<input
  type={{ inputType }}
  id={{ inputId }}
  name={{ inputName }}
  {{ disabled }}
  value={{#if inputValue}}{{inputValue}}{{else}}""{{/if}}
  class={{ inputClassName }}
  placeholder={{#if inputPlaceholder}}{{inputPlaceholder}}{{else}}""{{/if}}
/>
`
