import Handlebars from 'handlebars';
import template from './index.tmlp';
import './components';

// eslint-disable-next-line no-undef
window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  // eslint-disable-next-line no-undef
  const root = document.getElementById('root');

  root!.innerHTML = compiled({});
});
