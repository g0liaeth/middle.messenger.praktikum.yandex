export default `
{{> profile-img imgPath=imgPath}}
{{> text className=usernameClass value=usernameText}}

{{#each formItemList}}
  {{> form-group }}
{{/each}}

{{> button label=btnChangeDataLabel className=btnChangeDataClass}}
{{> button label=btnChangePasswordLabel className=btnChangePasswordClass}}
{{> button label=btnExitLabel className=btnExitClass}}
{{> button label=btnBackLabel className=btnBackClass}}
`;
