export default `
{{> profile-img imgPath=imgPath}}

{{#each formItemList}}
  {{> form-group }}
{{/each}}

{{> button label=btnSaveLabel className=btnSaveClass}}
{{> button label=btnBackLabel className=btnBackClass}}
`;
