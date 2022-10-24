import renderDOM from './utils/renderDOM';
import ErrorPage from './pages/ErrorPage';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Signin from './pages/Signin';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import ChangePassword from './pages/ChangePassword';

const currentRoute: string = window.location.pathname;

const chat = new Chat({});
const login = new Login({});
const signin = new Signin({});
const profile = new Profile({});
const editProfile = new EditProfile({});
const changePassword = new ChangePassword({});
const errorPage = new ErrorPage({
  codeClassName: 'header-big',
  codeValue: '404',
  textClassName: 'main-text',
  textValue: 'Не туда попали',
  bindedBlock: chat,
});

switch (currentRoute) {
  case '/':
    renderDOM('#root', login);
    break;

  case '/login':
    renderDOM('#root', login);
    break;

  case '/signin':
    renderDOM('#root', signin);
    break;

  case '/chat':
    renderDOM('#root', chat);
    break;

  case '/profile':
    renderDOM('#root', profile);
    break;

  case '/edit-profile':
    renderDOM('#root', editProfile);
    break;

  case '/change-password':
    renderDOM('#root', changePassword);
    break;

  default:
    renderDOM('#root', errorPage);
    break;
}

setTimeout(() => {
  // errorPage.props.codeValue = 'second';
  errorPage.setProps({
    codeClassName: 'header-big',
    codeValue: '500',
    textClassName: 'main-text',
    textValue: 'Мы уже фиксим',
  });
}, 2000);
