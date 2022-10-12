export default `
<form>
  {{> text className=headerClass value=headerText}}
  <div>
    {{#each formItemList}}
      {{> form-group className=this.className labelText=this.labelText inputType=this.inputType inputId=this.inputId inputName=this.inputName }}
    {{/each}}
  </div>
  {{> button label=btnLabel className=btnClass}}
  {{> link path=registrationLinkPath text=registrationLinkText className=registrationLinkClass }}
</form>
`
