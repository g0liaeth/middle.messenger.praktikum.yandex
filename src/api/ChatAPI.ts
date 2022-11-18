import { CreateChatData } from '../types/commonTypes';
import BaseAPI from './BaseAPI';

const headers = {
  'Content-Type': 'application/json',
};

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async getChats() {
    const result = await this.httpClient.get('');
    return result;
  }

  async createChat(data: CreateChatData) {
    const result = await this.httpClient.post('', { data, headers });
    return result;
  }

  async deleteChatById() {
    throw new Error('Not implemented');
  }

  async getChatSendFiles() {
    throw new Error('Not implemented');
  }

  async getChatUsers() {
    throw new Error('Not implemented');
  }

  async getCommonChatWithCurrentChatUser() {
    throw new Error('Not implemented');
  }

  async getNewMessagesCount() {
    throw new Error('Not implemented');
  }

  async addUsersToChat(userId: string, chatId: number) {
    const result = await this.httpClient.put('/users', {
      data: { users: [Number(userId)], chatId },
      headers,
    });
    return result;
  }

  async deleteUsersFromChat() {
    throw new Error('Not implemented');
  }

  async getWsToken(chatId: number) {
    const result = await this.httpClient.post(`/token/${chatId}`);
    return result;
  }
}
