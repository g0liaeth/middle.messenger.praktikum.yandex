import renderDOM from './utils/renderDOM';
import Error from './pages/Error';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

const currentRoute: string = window.location.pathname;

switch (currentRoute) {
  case '/':
    renderDOM('#root', new Login({ backgroundColor: '#d4e3f7' }));
    break;

  case '/login':
    renderDOM('#root', new Login({ backgroundColor: '#d4e3f7' }));
    break;

  case '/signin':
    renderDOM('#root', new Signin({ backgroundColor: '#d4e3f7' }));
    break;

  case '/chat':
    renderDOM('#root', new Chat({ backgroundColor: '#fff' }));
    break;

  case '/profile':
    renderDOM('#root', new Profile({ backgroundColor: '#fff' }));
    break;

  case '/edit-profile':
    renderDOM('#root', new EditProfile({ backgroundColor: '#fff' }));
    break;

  case '/change-password':
    renderDOM('#root', new ChangePassword({ backgroundColor: '#fff' }));
    break;

  case '/500':
    renderDOM(
      '#root',
      new Error({
        codeClassName: 'header-big',
        codeValue: '500',
        textClassName: 'main-text',
        textValue: 'Мы уже фиксим',
        backgroundColor: '#d4e3f7',
      }),
    );
    break;

  default:
    renderDOM(
      '#root',
      new Error({
        codeClassName: 'header-big',
        codeValue: '404',
        textClassName: 'main-text',
        textValue: 'Не туда попали',
        backgroundColor: '#d4e3f7',
      }),
    );
    break;
}
