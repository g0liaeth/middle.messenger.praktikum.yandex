export default `
<div class="chat-item">
  <div class="chat-item-left">
    {{> user-avatar avatarImg=userAvatar }}
    <div class="chat-info">
      <div class="sender"><b>{{userName}}</b></div>
      <div>
        <span class="last-message-sender">{{#if lastMessageSender}}Вы:{{else}}{{null}}{{/if}}</span>
        {{lastMessageText}}
      </div>
    </div>
  </div>
  <div class="chat-item-right">    
      <div class="last-message-time">
        <time datetime={{lastMessageTime}}>
          {{lastMessageTime}}
        </time>
      </div>
      {{#if hasNewMessages}}
      <div class="new-messages">
        {{newMessagesCount}}
      </div>
      {{/if}}    
  </div>
</div>
`
