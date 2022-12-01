import Error from './pages/Error/Error';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import Registration from './pages/Registration/Registration';
import Profile from './pages/Profile/Profile';
import EditProfile from './pages/EditProfile/EditProfile';
import ChangePassword from './pages/ChangePassword/ChangePassword';
import Router from './utils/Router/Router';

const router = new Router('#root');

router
  .use('/', Login, '', {})
  .use('/login', Login, '', {})
  .use('/signup', Registration, '', {})
  .use('/chat', Chat, '', {})
  .use('/profile', Profile, '', {})
  .use('/edit-profile', EditProfile, '', {})
  .use('/change-password', ChangePassword, '', {})
  .use('/500', Error, '', {
    codeClassName: 'header-big',
    codeValue: '500',
    textClassName: 'main-text',
    textValue: 'Мы уже фиксим',
  })
  .use('/404', Error, '', {
    codeClassName: 'header-big',
    codeValue: '404',
    textClassName: 'main-text',
    textValue: 'Не туда попали',
  })
  .start();
