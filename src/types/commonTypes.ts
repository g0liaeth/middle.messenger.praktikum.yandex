// import Block from '../utils/Block/Block';

export type LoginData = {
  login: string;
  password: string;
};

export type CreateChatData = {
  title: string;
};

export type RegistrationData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
};

export type ChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type ChangeProfileData = {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
};

export type RegistrationResponseData = {
  id: number;
};

export type UserData = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type wsMessageType = {
  chat_id: number;
  time: string;
  type: string;
  user_id: string;
  content: string;
  is_read: boolean;
  file?: {
    id: number;
    user_id: number;
    path: string;
    filename: string;
    content_type: string;
    content_size: number;
    upload_date: string;
  };
};

export type ArchiveMessageType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type Handler = (...args: unknown[]) => void;

export interface IProps {
  rootQuery: string;
  props?: Props;
}

export type ElementEvent = {
  id: string;
  fn: (event: Event) => void;
};

export type Events = Record<string, ElementEvent[]>;

export type Props = PlainObject;

export type PlainObject<T = unknown> = {
  [key in string]: T;
};

export type BlockInheritor = new (tag?: string, props?: any) => any;

export type Indexed<T = any> = {
  [key in string]: T;
};

export type RegistrationResponse = {
  id: number;
};

export type ChatType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type DeleteChatResponseType = {
  userId: number;
  result: {
    id: number;
    title: string;
    avatar: string;
  };
};

export type GetWSTokenResponseType = {
  token: string;
};

export type UploadChatAvatarType = {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message: {
    user: {
      first_name: string;
      second_name: string;
      avatar: string;
      email: string;
      login: string;
      phone: string;
    };
    time: string;
    content: string;
  };
};

export type AppStateType = {
  profileState: {
    user: {
      avatar: string;
      display_name: string;
      email: string;
      first_name: string;
      id: number;
      login: string;
      phone: string;
      second_name: string;
    };
  };
  chatState: {
    chats: {
      id: number;
      title: string;
      avatar: string;
      created_by: number;
      unread_count: number;
      last_message: {
        user: {
          first_name: string;
          second_name: string;
          display_name: string;
          login: string;
          avatar: string;
          email: string;
          phone: string;
        };
        time: string;
        content: string;
        id: number;
      };
    }[];
    messages: {
      user_id: string;
      chat_id: number;
      type: string;
      time: string;
      content: string;
      is_read: boolean;
    }[];
    currentChat: number;
    findedUsers: {
      id: number;
      first_name: string;
      second_name: string;
      display_name: string;
      login: string;
      email: string;
      phone: string;
      avatar: string;
    }[];
  };
};
