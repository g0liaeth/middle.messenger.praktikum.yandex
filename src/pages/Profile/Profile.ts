import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
import { UPLOAD_URL } from '../../constants/apiConstants';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import { AppStateType } from '../../utils/Store/initialState/initialState';
import ProfileController from './ProfileController';

class Profile extends Block<BasePropsType & ReturnType<typeof mapStateToProps>> {
  protected _controller: ProfileController;

  constructor(tag = 'main', props?: BasePropsType & ReturnType<typeof mapStateToProps>) {
    super(tag, { ...props, class: 'main-container' } as BasePropsType &
      ReturnType<typeof mapStateToProps>);
    this._controller = new ProfileController();
    this._controller.getUserDetails(this);
  }

  public show() {
    this._controller.getUserDetails(this);
    const element = this.getContent();
    if (element) {
      element.classList.remove('hidden-block');
    }
  }

  render() {
    console.log('render profile', this._props);

    const source = `
      <img src={{ avatarUrl }} alt="avatar-img" class="profile-photo">
      {{{ userName }}}

      <div class="form-group-profile">
        <div>Почта</div>
        <div class="disabled-text">{{user.email}}</div>
      </div>
      <div class="form-group-profile">
        <div>Логин</div>
        <div class="disabled-text">{{user.login}}</div>
      </div>
      <div class="form-group-profile">
        <div>Имя</div>
        <div class="disabled-text">{{user.first_name}}</div>
      </div>
      <div class="form-group-profile">
        <div>Фамилия</div>
        <div class="disabled-text">{{user.second_name}}</div>
      </div>
      <div class="form-group-profile">
        <div>Телефон</div>
        <div class="disabled-text">{{user.phone}}</div>
      </div>

      {{{ btnProfileEdit }}}
      {{{ btnChangePassword }}}
      {{{ btnExit }}}
      {{{ btnBack }}}

      {{{ popup }}}
    `;

    const userName = new Text(undefined, {
      class: 'profile-name',
      data: {
        value: this._props?.user?.login,
      },
    });

    const btnProfileEdit = new Button(undefined, {
      class: 'btn-change',
      type: 'button',
      data: {
        label: 'Изменить данные',
      },
      onClick: (event) => {
        event.preventDefault();
        this._controller.goChangeProfile();
      },
    });

    const btnChangePassword = new Button(undefined, {
      class: 'btn-change',
      type: 'button',
      data: {
        label: 'Изменить пароль',
      },
      onClick: (event) => {
        event.preventDefault();
        this._controller.goChangePassword();
      },
    });

    const btnExit = new Button(undefined, {
      class: 'btn-exit',
      type: 'button',
      data: {
        label: 'Выйти',
      },
      onClick: (event) => {
        event.preventDefault();
        this._controller.logout(this);
      },
    });

    const btnBack = new Button(undefined, {
      class: 'btn-back',
      type: 'button',
      data: {
        label: '< назад к чатам',
      },
      onClick: (event) => {
        event.preventDefault();
        this._controller.goToChat();
      },
    });

    return compileComponent(source, {
      ...this._props,
      userName,
      btnProfileEdit,
      btnChangePassword,
      btnExit,
      btnBack,

      avatarUrl: this._props?.user && UPLOAD_URL + this._props?.user?.avatar,
    });
  }
}

function mapStateToProps(state: AppStateType) {
  return {
    user: state.profileState.user,
  };
}

export default Profile;
