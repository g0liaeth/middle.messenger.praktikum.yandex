import AuthAPI from '../../api/AuthAPI';
import ChatAPI from '../../api/ChatAPI';
import MessagesAPI from '../../api/MesaagesAPI';
import UserAPI from '../../api/UserAPI';
import { WS_URL } from '../../constants/apiConstants';
import BaseController from '../../utils/BaseController';

export default class ChatController extends BaseController {
  private _authAPI: AuthAPI;
  private _chatAPI: ChatAPI;
  private _userAPI: UserAPI;
  private _messagesAPIs: Record<string, number | MessagesAPI>[] = [];

  constructor() {
    super();
    this._authAPI = new AuthAPI();
    this._chatAPI = new ChatAPI();
    this._userAPI = new UserAPI();
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

  async addUser(userId: string) {
    try {
      const chatId = this._store.getState().chatState.currentChat;
      if (userId && chatId) {
        const res = await this._chatAPI.addUsersToChat(userId, chatId);
      }
    } catch (error) {
      console.log(error);
    }
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

  setCurrentChat(id: number) {
    this._store.setState('chatState.currentChat', id);
  }

  async findUsers(login: string) {
    try {
      const res = await this._userAPI.searchUserByLogin(login);
      if (res.status === 200) {
        this._store.setState('chatState.findedUsers', res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async clearFindedUsers() {
    try {
      this._store.setState('chatState.findedUsers', []);
    } catch (error) {
      console.log(error);
    }
  }

  async getUsersByLogin(login: string) {
    try {
      const res = await this._userAPI.searchUserByLogin(login);
      if (res.status === 200) {
        return res.data;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getWsToken(chatId: number) {
    try {
      const res = await this._chatAPI.getWsToken(chatId);
      if (res.status === 200) {
        return res.data.token;
      }
    } catch (error) {
      console.log(error);
    }
  }

  async connectToChat(chatId: number) {
    try {
      if (!this._messagesAPIs.some((item) => item.chatId === chatId)) {
        const token = await this.getWsToken(chatId);
        const userId = this._store.getState().profileState.user.id;
        const ws = new MessagesAPI(`${WS_URL}/${userId}/${chatId}/${token}`);
        ws.open((msg) => console.log(msg));
        ws.message((data) => console.log('Получены данные: ', data));
        ws.close(
          (data) => console.log(data),
          (data) => console.log(data),
        );
        ws.error((data) => console.log(data));
        this._messagesAPIs.push({
          chatId,
          ws,
        });
      } else {
        this._messagesAPIs.find((item) => item.chatId === chatId)['ws'].ping();
      }
    } catch (error) {
      console.log(error);
    }
  }

  sendMessage(message: string) {
    const chatId = this._store.getState().chatState.currentChat;
    this._messagesAPIs.find((item) => item.chatId === chatId)['ws'].send(message);
  }
}
