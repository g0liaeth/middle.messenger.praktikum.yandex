import './components';
import Button, { ButtonProps } from './Button';
import renderDOM from './utils/renderDOM';
import ErrorPage from './ErrorPage';

const currentRoute: string = window.location.pathname;
// const button = new Button({ className: 'btn-green', label: 'Click me please!' });
const errorPage = new ErrorPage({
  codeClassName: 'header-big',
  codeValue: '404',
  textClassName: 'main-text',
  textValue: 'Не туда попали',
});

switch (currentRoute) {
  // case '/':
  //   renderDOM('#root', new Login());
  //   break;

  // case '/login':
  //   renderDOM('#root', new Login());
  //   break;

  // case '/signin':
  //   renderDOM('#root', new Signin());
  //   break;

  // case '/chat':
  //   renderDOM('#root', new Chat());
  //   break;

  // case '/profile':
  //   renderDOM('#root', new Profile());
  //   break;

  // case '/edit-profile':
  //   renderDOM('#root', new EditProfile());
  //   break;

  // case '/change-password':
  //   renderDOM('#root', new ChangePassword());
  //   break;

  default:
    renderDOM('#root', errorPage);
    break;
}

// renderDOM<ButtonProps>('#root', new Button({ className: 'btn-green', label: 'Click me please!' }));
// setTimeout(() => {
//   // button.props.label = 'second';
//   button.setProps({
//     label: 'new label',
//     className: 'new-class',
//   });
// }, 2000);

setTimeout(() => {
  // errorPage.props.codeValue = 'second';
  errorPage.setProps({
    codeClassName: 'header-big',
    codeValue: '500',
    textClassName: 'main-text',
    textValue: 'Мы уже фиксим',
  });
}, 2000);
