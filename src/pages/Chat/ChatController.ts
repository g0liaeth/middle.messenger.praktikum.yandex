import AuthAPI from '../../api/AuthAPI';
import ChatAPI from '../../api/ChatAPI';
import MessagesAPI from '../../api/MesaagesAPI';
import UserAPI from '../../api/UserAPI';
import { WS_URL } from '../../constants/apiConstants';
import BaseController from '../../utils/BaseController';

function ensure<T>(
  argument: T | undefined | null,
  message = 'This value was promised to be there.',
): T {
  if (argument === undefined || argument === null) {
    throw new TypeError(message);
  }

  return argument;
}

export default class ChatController extends BaseController {
  private _authAPI: AuthAPI;
  private _chatAPI: ChatAPI;
  private _userAPI: UserAPI;
  private _messagesAPIs: { chatId: number; ws: MessagesAPI }[];
  private _messageQueue: any[];

  constructor() {
    super();
    this._authAPI = new AuthAPI();
    this._chatAPI = new ChatAPI();
    this._userAPI = new UserAPI();
    this._messagesAPIs = [];
    this._messageQueue = [];
  }

  async fetchUser() {
    try {
      const res = await this._authAPI.getUserInfo();
      if (res.status === 200) {
        this._store.setState('profileState.user', res.data);
      } else {
        this._router.go('/login');
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

  async deleteChat(chatId: number | null) {
    try {
      if (!chatId) {
        return;
      }

      const res = await this._chatAPI.deleteChatById(chatId);
      if (res.status === 200) {
        console.log(`Chat ${chatId} successfully deleted`);
        this._store.setState('chatState.messages', []);
        this.getChats();
      }
    } catch (error) {
      console.log(error);
    }
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
        if (res.status === 200) {
          console.log(`User ${userId} added to chat ${chatId}`);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUser(userLogin: string) {
    try {
      const userId = await this.getUsersByLogin(userLogin).then((res) => res[0].id);
      const chatId = this._store.getState().chatState.currentChat;
      const res = await this._chatAPI.deleteUsersFromChat(userId, chatId);
      if (res.status === 200) {
        console.log(`User ${userLogin} deleted from chat ${chatId}`);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getNewMessagesCount() {
    throw new Error('Not implemented');
  }

  getState() {
    return this._store.getState();
  }

  setCurrentChat(id: number | null) {
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
        ws.open(() => {
          console.log('Соединение установлено');

          this._messageQueue.forEach((msg) => {
            this.sendMessage(msg[0], msg[1]);
          });

          this._messageQueue = [];
          ws.send('0', 'get old');
        });
        ws.message((data) => {
          const prepearedData = JSON.parse(data as string);
          if (Array.isArray(prepearedData)) {
            this._store.setState('chatState.messages', [...prepearedData]);
          } else if (prepearedData.type === 'message') {
            ws.send('0', 'get old');
          }
        });
        ws.close(
          (data) => console.log(data),
          (data) => console.log(data),
        );
        ws.error((data) => console.log(data));
        ws.ping();
        this._messagesAPIs.push({
          chatId,
          ws,
        });
      } else {
        this.sendMessage('0', 'get old');
      }
    } catch (error) {
      console.log(error);
    }
  }

  sendMessage(message: string, type = 'message') {
    const chatId = this._store.getState().chatState.currentChat;
    const socket = ensure(this._messagesAPIs.find((item) => item.chatId === chatId))['ws'];

    if (socket.getState() !== WebSocket.OPEN) {
      // Ежели нет, добавляем сообщение в очередь
      this._messageQueue.push([message, type]);
      return;
    }

    // Отправляет сообщение, если есть соединение
    socket.send(message, type);
  }

  async changeChatAvatar(chatId: number, avatar: File) {
    try {
      const res = await this._chatAPI.uploadChatAvatar(chatId, avatar);
      if (res.status === 200) {
        this.getChats();
      }
    } catch (error) {
      console.log(error);
    }
  }

  goToProfile() {
    this._router.go('/profile');
  }
}
