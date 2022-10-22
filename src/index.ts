import './components';
import Button, { ButtonProps } from './button/Button';
import renderDOM from './utils/renderDOM';

const currentRoute: string = window.location.pathname;

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
    renderDOM<ButtonProps>(
      '#root',
      new Button({ className: 'btn-green', label: 'Click me please!' }),
    );
    break;
}

// renderDOM<ButtonProps>('#root', new Button({ className: 'btn-green', label: 'Click me please!' }));
