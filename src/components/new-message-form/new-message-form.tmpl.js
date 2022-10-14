export default `
{{> input inputType=newMessageInputType inputId=newMessageInputId inputName=newMessageInputName inputPlaceholder=newMessageInputPlaceholder inputClassName=newMessageInputClass}}
<div class="send-message-container">
  <img src={{attachButtonImg}} alt="paperclip" class={{attachButtonClass}}>
  {{> button className=sendButtonClass label=sendButtonLabel }}
</div>
`
