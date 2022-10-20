import Handlebars from 'handlebars';
import template from './404.tmpl';
import '../../components';

window.addEventListener('DOMContentLoaded', () => {
  const compiled = Handlebars.compile(template);
  const root = document.getElementById('root');

  if (root !== null) {
    root.innerHTML = compiled({
      statusCode: '404',
      headerClassName: 'header-big',
      mainContent: 'Не туда попали',
      contentClassName: 'main-text',
      btnLabel: 'Назад к чатам',
      btnClassName: 'btn-green',
    });
  }
});
