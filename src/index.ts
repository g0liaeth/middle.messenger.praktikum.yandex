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
  .use('/', Login, { backgroundColor: '#d4e3f7' })
  .use('/login', Login, { backgroundColor: '#d4e3f7' })
  .use('/signup', Registration, { backgroundColor: '#d4e3f7' })
  .use('/chat', Chat, { backgroundColor: '#fff' })
  .use('/profile', Profile, { backgroundColor: '#fff' })
  .use('/edit-profile', EditProfile, { backgroundColor: '#fff' })
  .use('/change-password', ChangePassword, { backgroundColor: '#fff' })
  .use('/500', Error, {
    codeClassName: 'header-big',
    codeValue: '500',
    textClassName: 'main-text',
    textValue: 'Мы уже фиксим',
    backgroundColor: '#d4e3f7',
  })
  .use('/404', Error, {
    codeClassName: 'header-big',
    codeValue: '404',
    textClassName: 'main-text',
    textValue: 'Не туда попали',
    backgroundColor: '#d4e3f7',
  })
  .start();
