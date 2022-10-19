export default `
<div class="day-list">
  <div class="day-divider">
    {{ dayMeta }}
  </div>
  {{#each dayMessages}}
    {{> message }}
  {{/each}}
</div>
`;
