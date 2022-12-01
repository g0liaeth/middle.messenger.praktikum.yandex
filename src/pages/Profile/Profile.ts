import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import { UPLOAD_URL } from '../../constants/apiConstants';
// import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import ProfileController from './ProfileController';

class Profile extends Block<any> {
  protected _controller: ProfileController;

  constructor(props: any) {
    super('main', { ...props, class: 'main-container' });
    this._controller = new ProfileController();
    this._controller.fetchUser();
  }

  render() {
    const source = `
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
    `;

    const userName = new Text({
      class: 'profile-name',

      data: {
        value: this._props?.userInfo?.login,
      },
    });

    const btnProfileEdit = new Button({
      class: 'btn-change',
      type: 'button',
      data: {
        label: 'Изменить данные',
      },

      onClick: () => {
        window.location.assign('edit-profile');
      },
    });

    const btnChangePassword = new Button({
      class: 'btn-change',
      type: 'button',
      data: {
        label: 'Изменить пароль',
      },
      onClick: () => {
        window.location.assign('change-password');
      },
    });

    const btnExit = new Button({
      class: 'btn-exit',
      type: 'button',
      data: {
        label: 'Выйти',
      },
      onClick: () => {
        this._controller.logout();
      },
    });

    const btnBack = new Button({
      class: 'btn-back',
      type: 'button',
      data: {
        label: '< назад к чатам',
      },
      onClick: () => {
        window.location.assign('/chat');
      },
    });

    return compileComponent(source, {
      ...this._props,
      userName,
      btnProfileEdit,
      btnChangePassword,
      btnExit,
      btnBack,

      avatarUrl: Object.prototype.hasOwnProperty.call(this._props.userInfo, 'avatar')
        ? UPLOAD_URL + this._props.userInfo.avatar
        : null,
    });
  }
}

function mapStateToProps(state: any) {
  return {
    userInfo: state.profileState.user,
  };
}

export default connect<any>(mapStateToProps)(Profile);
