import Error from './pages/Error/Error';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Router from './utils/Router/Router';
import Store from './utils/Store/Store';

const router = new Router('#root');

router
  .use('/', Login, undefined, undefined)
  .use('/login', Login, undefined, undefined)
  .use('/signup', Registration, undefined, undefined)
  .use('/chat', Chat, undefined, undefined)
  .use('/profile', Profile, undefined, undefined)
  .use('/edit-profile', EditProfile, undefined, undefined)
  .use('/change-password', ChangePassword, undefined, undefined)
  .use('/500', Error, undefined, {
    data: {
      codeClassName: 'header-big',
      codeValue: '500',
      textClassName: 'main-text',
      textValue: 'Мы уже фиксим',
    },
  })
  .use('/404', Error, undefined, {
    data: {
      codeClassName: 'header-big',
      codeValue: '404',
      textClassName: 'main-text',
      textValue: 'Не туда попали',
    },
  })
  .start();

(window as any)._appStore = new Store();
(window as any)._myRouter = router;
