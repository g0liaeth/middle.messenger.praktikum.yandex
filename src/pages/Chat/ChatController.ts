import AuthAPI from '../../api/AuthAPI';
import ChatAPI from '../../api/ChatAPI';
import BaseController from '../../utils/BaseController';

export default class ChatController extends BaseController {
  private _authAPI: AuthAPI;
  private _chatAPI: ChatAPI;

  constructor() {
    super();
    this._authAPI = new AuthAPI();
    this._chatAPI = new ChatAPI();
  }

  async fetchUser() {
    try {
      const state = this._store.getState();
      if (!state.profileState.user.login) {
        const res = await this._authAPI.getUserInfo();
        if (res.status === 200) {
          this._store.setState('profileState.user', res.data);
        } else {
          this._router.go('/login');
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createChat(title: string) {
    try {
      const res = await this._chatAPI.createChat({ title });
      if (res.status === 200) {
        const res = await this._chatAPI.getChats();
        this._store.setState('chatState.chats', res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteChat() {
    throw new Error('Not implemented');
  }

  async getChats() {
    try {
      const res = await this._chatAPI.getChats();
      if (res.status === 200) {
        this._store.setState('chatState.chats', res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getChatUsers() {
    throw new Error('Not implemented');
  }

  async addUser() {
    throw new Error('Not implemented');
  }

  async deleteUser() {
    throw new Error('Not implemented');
  }

  async getNewMessagesCount() {
    throw new Error('Not implemented');
  }

  getState() {
    return this._store.getState();
  }
}
