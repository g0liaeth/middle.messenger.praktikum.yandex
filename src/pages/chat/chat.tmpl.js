export default `
<div class="left-container">
    <div class="profile-link-container">
      {{> link path=profileLink className=profileLinkClass text=profileLinkText }}
    </div>
    <div class="search-container">
      {{> input inputType=searchInputType inputPlaceholder=searchInputPlaceholder inputClassName=searchInputClassName }}
    </div>
    <div class="chat-list-container">
      <div class="chat-list">
        {{#each chatList}}
          {{> chat-item }}
        {{/each }}
      </div>
    </div>
</div>
<div class="right-container">
  <div class="chat-header">
    <div class="chat-header-left">
      {{> user-avatar avatarImg=avatarImg}}
      {{> text className="avatar-name" value="Вадим" }}
    </div>
    <div class="chat-header-right">
      {{> menu mainMenuImg=mainMenuImg mainMenuClass=mainMenuClass }}
    </div>
  </div>
  <div class="chat-body">
    <div class="message-list">
      {{#each messageList}}
        {{> message }}
      {{/each}}
    </div>
  </div>
  <div class="chat-footer">
    {{> new-message-form }}
  </div>
</div>
`