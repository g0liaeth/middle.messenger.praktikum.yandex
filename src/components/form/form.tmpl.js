export default `
<form>
  {{> text className=headerClass value=headerText}}
  <div>
    {{#each formItemList}}
      {{> form-group }}
    {{/each}}
  </div>
  {{> button label=btnLabel className=btnClass}}
  {{> link path=registrationLinkPath text=registrationLinkText className=registrationLinkClass }}
</form>
`
