import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import { UPLOAD_URL } from '../../constants/apiConstants';
// import img from '../static/mock-ava.png';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import ProfileController from './ProfileController';

class Profile<T extends BasePropsType> extends Block<T> {
  protected _profileController: ProfileController;

  constructor(props: T) {
    super(props);
    this._profileController = new ProfileController();
    this._profileController.fetchUser();
  }

  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    console.log(this.props);
  }

  render() {
    console.log('render Profile');

    const source = `
    <main class="main-container">
      <img src={{ avatarUrl }} alt="avatar-img" class="profile-photo">
      {{{ userName }}}

      <div class="form-group-profile">
        <div>Почта</div>
        <div class="disabled-text">{{userInfo.email}}</div>
      </div>
      <div class="form-group-profile">
        <div>Логин</div>
        <div class="disabled-text">{{userInfo.login}}</div>
      </div>
      <div class="form-group-profile">
        <div>Имя</div>
        <div class="disabled-text">{{userInfo.first_name}}</div>
      </div>
      <div class="form-group-profile">
        <div>Фамилия</div>
        <div class="disabled-text">{{userInfo.second_name}}</div>
      </div>
      <div class="form-group-profile">
        <div>Телефон</div>
        <div class="disabled-text">{{userInfo.phone}}</div>
      </div>

      {{{ btnProfileEdit }}}
      {{{ btnChangePassword }}}
      {{{ btnExit }}}
      {{{ btnBack }}}

      {{{ popup }}}
    </main>
    `;

    const userName = new Text({
      className: 'profile-name',
      value: this.props.userInfo.login,
    });

    const btnProfileEdit = new Button({
      label: 'Изменить данные',
      className: 'btn-change',
      type: 'button',
      events: {
        click: () => {
          window.location.assign('edit-profile');
        },
      },
    });

    const btnChangePassword = new Button({
      label: 'Изменить пароль',
      className: 'btn-change',
      type: 'button',
      events: {
        click: () => {
          window.location.assign('change-password');
        },
      },
    });

    const btnExit = new Button({
      label: 'Выйти',
      className: 'btn-exit',
      type: 'button',
      events: {
        click: () => {
          this._profileController.logout();
        },
      },
    });

    const btnBack = new Button({
      label: '< назад к чатам',
      className: 'btn-back',
      type: 'button',
      events: {
        click: () => {
          window.location.assign('/chat');
        },
      },
    });

    return compileComponent(source, {
      ...this.props,
      userName,
      btnProfileEdit,
      btnChangePassword,
      btnExit,
      btnBack,
      avatarUrl: this.props.userInfo.hasOwnProperty('avatar')
        ? UPLOAD_URL + this.props.userInfo.avatar
        : null,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    userInfo: state.profileState.user,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Profile);
