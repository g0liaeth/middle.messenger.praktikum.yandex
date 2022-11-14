import Button from '../../components/Button/Button';
import Text from '../../components/Text/Text';
// import img from '../static/mock-ava.png';
import { BasePropsType } from '../../types/componentTypes';
import Block from '../../utils/Block/Block';
import compileComponent from '../../utils/Block/compileComponent';
import connect from '../../utils/Store/connect';
import ProfileController from './ProfileController';
// import { UserData } from '../../types/commonTypes';

class Profile<T extends BasePropsType> extends Block<T> {
  // private _userInfo: Record<string, string> = {};
  private _profileController: ProfileController;

  constructor(props: T) {
    super(props);
    this._profileController = new ProfileController();
    // console.log(this._profileController.getState());
    // this._profileController.fetchUser();
  }

  componentDidMount(): void {
    if (this.props.backgroundColor) document.body.style.background = this.props.backgroundColor;
    // this._userInfo = {
    //   email: 'abcd@yandex.ru',
    //   login: 'ivan665566966',
    //   first_name: 'Иван',
    //   second_name: 'Иванов',
    //   phone: '8-999-999-99-99',
    //   imgPath: img,
    // };

    // console.log(this.props);
  }

  render() {
    const source = `
    <main class="main-container">
      <img src={{ imgPath }} alt="avatar" class="profile-photo">
      {{{ userName }}}

      <div class="form-group-profile">
        <div>Почта</div>
        <div class="disabled-text">{{email}}</div>
      </div>
      <div class="form-group-profile">
        <div>Логин</div>
        <div class="disabled-text">{{login}}</div>
      </div>
      <div class="form-group-profile">
        <div>Имя</div>
        <div class="disabled-text">{{first_name}}</div>
      </div>
      <div class="form-group-profile">
        <div>Фамилия</div>
        <div class="disabled-text">{{second_name}}</div>
      </div>
      <div class="form-group-profile">
        <div>Телефон</div>
        <div class="disabled-text">{{phone}}</div>
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
          window.location.assign('/');
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
    });
  }
}

function mapStateToProps(state: any) {
  return {
    userInfo: state.user,
  };
}

export default connect<BasePropsType>(mapStateToProps)(Profile);
