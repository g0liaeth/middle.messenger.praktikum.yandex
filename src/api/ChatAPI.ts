import BaseAPI from './BaseAPI';

export default class ChatAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }

  async getChats() {
    const result = await this.httpClient.get('');
    return result;
  }

  async createChat() {
    throw new Error('Not implemented');
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

  async addUsersToChat() {
    throw new Error('Not implemented');
  }

  async deleteUsersFromChat() {
    throw new Error('Not implemented');
  }
}
