import Block from '../utils/Block/Block';

export type LoginData = {
  login: string;
  password: string;
};

export type RegistrationData = {
  email: string;
  login: string;
  first_name: string;
  second_name: string;
  phone: string;
  password: string;
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

export type BlockInheritor = new (props: any) => InstanceType<typeof Block>;

export type Indexed<T = any> = {
  [key in string]: T;
};
