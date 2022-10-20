import Handlebars from 'handlebars';
import template from './index.tmlp';
import './components';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  if (root !== null) {
    root.innerHTML = compiled({});
  }
});
