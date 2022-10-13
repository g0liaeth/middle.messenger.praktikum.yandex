export default `
<div class="popup">
  <div class="popup-body">
    <div class="popup-content">
      {{> text className=headerClass value=headerText}}

      {{> form-group }}
      
      {{> button label=btnLabel className=btnClass}}
    </div>
  </div>
</div>
`
