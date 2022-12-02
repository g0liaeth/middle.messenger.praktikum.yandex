import { ChatType, CreateChatData } from '../types/commonTypes';
import { TResponse } from '../utils/Http/HTTPClient';
import BaseAPI from './BaseAPI';

const headers = {
  'Content-Type': 'application/json',
};

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async getChats(): Promise<TResponse<ChatType[]>> {
    const result = await this.httpClient.get('');
    return result;
  }

  async createChat(data: CreateChatData) {
    const result = await this.httpClient.post('', { data, headers });
    return result;
  }

  async deleteChatById(chatId: number) {
    const result = await this.httpClient.delete('', { data: { chatId }, headers });
    return result;
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

  async deleteUsersFromChat(userId: number, chatId: number) {
    const result = await this.httpClient.delete('/users', {
      data: { users: [userId], chatId },
      headers,
    });
    return result;
  }

  async getWsToken(chatId: number) {
    const result = await this.httpClient.post(`/token/${chatId}`);
    return result;
  }

  async uploadChatAvatar(chatId: number, data: File) {
    const formData = new FormData();
    //@ts-expect-error ???
    formData.append('chatId', chatId);
    formData.append('avatar', data);
    const result = await this.httpClient.put('/avatar', { data: formData });
    return result;
  }
}
