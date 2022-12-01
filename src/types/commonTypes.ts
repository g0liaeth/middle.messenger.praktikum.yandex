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

export type Handler = (...args: unknown[]) => void;

export interface IProps {
  rootQuery: string;
  props: Props;
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

export type BlockInheritor = new (tag: string, props: any) => any;

export type BlockInheritorV2 = new (tag: string, props: any) => any;

export type Indexed<T = any> = {
  [key in string]: T;
};
